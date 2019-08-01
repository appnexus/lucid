import _ from 'lodash';
import React, { Component, ComponentType, isValidElement } from 'react';
// import { buildHybridComponent } from '../../util/state-management';
import PropTypes from 'react-peek/prop-types';
import { findTypes } from '../../util/component-types';

const reducers = {};

const { any, bool, func, node, object, oneOf, string } = PropTypes;

type Reducer<S extends object> = (arg0: S, ...args: any[]) => S;
type Reducers<P, S extends object> = { [K in keyof P]?: Reducer<S> };
type Selectors<P, S extends object> = { [K in keyof P]?: (arg0: S) => any };

export function isPlainObjectOrEsModule(obj: any): boolean {
	return _.isPlainObject(obj) || _.get(obj, '__esModule', false);
}

export function omitFunctionPropsDeep(obj: object) {
	return _.reduce<{ [k: string]: any }, { [k: string]: any }>(
		obj,
		(memo, value, key) => {
			if (isPlainObjectOrEsModule(value)) {
				memo[key] = omitFunctionPropsDeep(value);
			} else if (!_.isFunction(value)) {
				memo[key] = value;
			}
			return memo;
		},
		{}
	);
}

export function safeMerge(objValue: any, srcValue: any) {
	// don't merge arrays
	if (_.isArray(srcValue) && _.isArray(objValue)) {
		return srcValue;
	}

	// guards against traversing react elements which can cause cyclical recursion
	// If we don't have this clause, lodash (as of 4.7.0) will attempt to
	// deeply clone the react children, which is really freaking slow.
	if (
		isValidElement(srcValue) ||
		(_.isArray(srcValue) && _.some(srcValue, isValidElement)) ||
		(_.isArray(srcValue) && _.isUndefined(objValue))
	) {
		return srcValue;
	}
}

export function getDeepPaths(
	obj: { [k: string]: any },
	path: string[] = []
): string[][] {
	return _.reduce(
		obj,
		(terminalKeys: string[][], value, key) =>
			isPlainObjectOrEsModule(value)
				? terminalKeys.concat(getDeepPaths(value, path.concat(key)))
				: terminalKeys.concat([path.concat(key)]),
		[]
	);
}

export function bindReducerToState<P, S extends object>(
	reducerFunction: Reducer<S>,
	{ getState, setState }: IStateOptions<S>,
	path: string[] = []
) {
	const localPath = _.take(path, _.size(path) - 1);
	return _.assign(
		function(...args: any[]) {
			if (_.isEmpty(localPath)) {
				setState(reducerFunction(getState(), ...args));
			} else {
				const localNextState = reducerFunction(
					_.get(getState(), localPath),
					...args
				);
				setState(_.set<S>(_.clone(getState()), localPath, localNextState));
			}
		},
		{ path }
	);
}

export function bindReducersToState<P, S extends object>(
	reducers: Reducers<P, S>,
	{ getState, setState }: IStateOptions<S>
) {
	return _.reduce(
		getDeepPaths(reducers),
		(memo, path) => {
			return _.set(
				memo,
				path,
				bindReducerToState(_.get(reducers, path), { getState, setState }, path)
			);
		},
		{}
	);
}

interface IStateOptions<S extends object> {
	getState: () => S;
	setState: (arg0: S) => void;
}

export function getStatefulPropsContext<P, S extends object>(
	reducers: Reducers<P, S>,
	{ getState, setState }: IStateOptions<S>
) {
	const boundReducers = bindReducersToState(reducers, { getState, setState });

	const combineFunctionsCustomizer = (objValue, srcValue) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return function(...args) {
				objValue(...args);
				return srcValue(...args);
			};
		}

		return safeMerge(objValue, srcValue);
	};

	const bindFunctionOverwritesCustomizer = (objValue, srcValue) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return bindReducerToState(
				srcValue,
				{ getState, setState },
				objValue.path
			);
		}

		return safeMerge(objValue, srcValue);
	};

	return {
		getPropReplaceReducers(props) {
			return _.mergeWith(
				{},
				boundReducers,
				getState(),
				props,
				bindFunctionOverwritesCustomizer
			);
		},
		getProps(props) {
			return _.mergeWith(
				{},
				boundReducers,
				getState(),
				props,
				combineFunctionsCustomizer
			);
		},
	};
}

interface IBuildHybridComponentOptions<P = {}, S extends object = {}> {
	replaceEvents?: boolean; // TODO: pretty sure this isn't used in anx-react or lucid, I looked through the git history and even when Joe wrote it in 2016 he didn't seem to need to for any concrete use case
	// TODO: do these need to be static?
	reducers?: Reducers<P, S>;
	// TODO: do these need to be static?
	selectors?: Selectors<P, S>;
}

abstract class HybridComponent<P, S> extends Component<P, S> {
	static displayName: string;
}

interface IBaseComponentType<P> {
	displayName: string;
	getDefaultProps?(): P;
}

interface IHybridCompatibleProps<S = {}> {
	initialState?: S;
}

function buildHybridComponent<
	P extends IHybridCompatibleProps,
	S extends object = {}
>(
	BaseComponent: ComponentType<P> & IBaseComponentType<P>,
	{
		replaceEvents = false,
		reducers = {},
		selectors = {},
	}: IBuildHybridComponentOptions<P, S>
) {
	// TODO: make sure hybrid components don't get double wrapped. Maybe use a type guard?

	class WrappedHybridComponent extends HybridComponent<P, S> {
		boundContext: any; // FIXME

		getInitialState() {
			const { initialState } = this.props; // initial state overrides
			const initialProps = BaseComponent.getDefaultProps
				? BaseComponent.getDefaultProps()
				: {};

			return _.mergeWith(
				{},
				omitFunctionPropsDeep(initialProps),
				initialState,
				safeMerge
			);
		}

		componentWillMount() {
			let synchronousState: S = this.state; //store reference to state, use in place of `this.state` in `getState`

			this.boundContext = getStatefulPropsContext(reducers, {
				getState: () =>
					_.mergeWith(
						{},
						omitFunctionPropsDeep(synchronousState),
						omitFunctionPropsDeep(this.props),
						safeMerge
					),
				setState: state => {
					synchronousState = state; //synchronously update the state reference
					this.setState(state);
				},
			});
		}

		render() {
			return React.createElement(BaseComponent, {} as P, this.props.children);
		}
	}

	WrappedHybridComponent.displayName = `Hybrid${BaseComponent.displayName}`;

	return WrappedHybridComponent;
}

interface IExpanderClassProps extends IHybridCompatibleProps {
	isExpanded: boolean;
}

class ExpanderClass extends Component<IExpanderClassProps, {}> {
	static displayName = 'foo';

	constructor(props: IExpanderClassProps) {
		super(props);
	}

	render() {
		return <div>{this.props.isExpanded ? 'yes' : 'no'}</div>;
	}
}

export const foo = buildHybridComponent<IExpanderClassProps>(ExpanderClass, {});
