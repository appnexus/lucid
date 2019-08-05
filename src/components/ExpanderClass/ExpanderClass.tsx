import _ from 'lodash';
import React, { Component, ComponentType, isValidElement } from 'react';
// import { buildHybridComponent } from '../../util/state-management';
import PropTypes from 'react-peek/prop-types';
import { findTypes } from '../../util/component-types';
import { createSelector } from 'reselect';


const { any, bool, func, node, object, oneOf, string } = PropTypes;

// TODO: could we somehow type the `...args` with a generic?
type Reducer<S extends object> = (arg0: S, ...args: any[]) => S;
type Reducers<P, S extends object> = { [K in keyof P]?: Reducer<S> };
type Selector<S extends object> = (arg0: S) => any;
type Selectors<P, S extends object> = { [K in keyof P]?: (arg0: S) => any };

interface IStateOptions<S extends object> {
	getState: () => S;
	setState: (arg0: S) => void;
}

/**
 * reduceSelectors
 *
 * Generates a root selector from a tree of selectors
 * @param {Object} selectors - a tree of selectors
 * @returns {function} root selector that when called with state, calls each of
 * the selectors in the tree with the state local to that selector.
 *
 * This function is memoized because it's recursive, and we want it to reuse
 * the functions created in the recursive reduce because those functions are
 * also memoized (reselect selectors are memoized with a cache of 1) and we want
 * to maintain their caches.
 */

type StringIndexObj = {
	[key: string]: any
}

interface ISelectorTree<S extends StringIndexObj> {
	[key: string]: ISelectorTree<S> | Selector<S>
}



function innerReduceSelectors<S extends StringIndexObj>(selectors: ISelectorTree<S>): Selector<S> {
	if (!isPlainObjectOrEsModule(selectors)) {
		throw new Error(
			'Selectors must be a plain object with function or plain object values'
		);
	}

	/**
	 * For each iteration of `reduceSelectors`, we return a memoized selector so
	 * that individual branches maintain reference equality if they haven't been
	 * modified, even if a sibling (and therefore the parent) has been modified.
	 */
	return createSelector(
		_.identity,
		(state: S) =>
			_.reduce(
				selectors,
				(acc, selector, key) => ({
					...acc,
					[key]: _.isFunction(selector)
						? selector(state)
						: reduceSelectors(selector)(state[key]),
				}),
				state
			)
	);
}

export const reduceSelectors = _.memoize(innerReduceSelectors);

export function isPlainObjectOrEsModule(obj: any): boolean {
	return _.isPlainObject(obj) || _.get(obj, '__esModule', false);
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

export function getStatefulPropsContext<P, S extends object>(
	reducers: Reducers<P, S>,
	{ getState, setState }: IStateOptions<S>
) {
	const boundReducers = bindReducersToState(reducers, { getState, setState });

	const combineFunctionsCustomizer = (objValue: any, srcValue: any) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return function(...args: any[]) {
				objValue(...args);
				return srcValue(...args);
			};
		}

		return safeMerge(objValue, srcValue);
	};

	const bindFunctionOverwritesCustomizer = (
		objValue: { (...args: any[]): any; path: string[] },
		srcValue: any
	) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			debugger;
			return bindReducerToState(
				srcValue,
				{ getState, setState },

				objValue.path
			);
		}

		return safeMerge(objValue, srcValue);
	};

	return {
		getPropReplaceReducers(props: P) {
			return _.mergeWith(
				{},
				boundReducers,
				getState(),
				props,
				bindFunctionOverwritesCustomizer
			);
		},
		getProps(props: P) {
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

		constructor(props: P) {
			super(props);

			const { initialState } = props; // initial state overrides
			const initialProps = BaseComponent.getDefaultProps
				? BaseComponent.getDefaultProps()
				: {};

			this.state = _.mergeWith(
				{},
				omitFunctionPropsDeep(initialProps),
				initialState,
				safeMerge
			) as S;
		}

		componentWillMount() {
			let synchronousState: S = this.state; //store reference to state, use in place of `this.state` in `getState`
			console.log('jdlm syn state', synchronousState);

			this.boundContext = getStatefulPropsContext<P, S>(reducers, {
				getState: () =>
					_.mergeWith(
						{},
						omitFunctionPropsDeep(synchronousState),
						omitFunctionPropsDeep(this.props),
						safeMerge
					) as S,
				setState: state => {
					synchronousState = state; //synchronously update the state reference
					this.setState(state);
				},
			});
		}

		render() {
			const selector = reduceSelectors(selectors);
			return React.createElement(BaseComponent, {} as P, this.props.children);
		}
	}

	WrappedHybridComponent.displayName = `Hybrid${BaseComponent.displayName}`;

	return WrappedHybridComponent;
}

interface IExpanderClassProps extends IHybridCompatibleProps {
	isExpanded: boolean;
	onToggle: (
		isExpanded: boolean,
		{
			event,
			props,
		}: { event: React.MouseEvent<HTMLElement>; props: IExpanderClassProps }
	) => void;
}

interface IExpanderClassState {
	isExpanded: boolean;
}

const reducers: Reducers<IExpanderClassProps, IExpanderClassState> = {
	onToggle: (state, isExpanded) => {
		console.log('jdlm onToggle was called');
		return { ...state, isExpanded: !isExpanded };
	},
};

export class ExpanderClassDumb extends Component<IExpanderClassProps, {}> {
	static displayName = 'Expander';
	constructor(props: IExpanderClassProps) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
	}

	static defaultProps = {
		onToggle: _.noop,
	};

	handleToggle(event: React.MouseEvent<HTMLElement>) {
		this.props.onToggle(!this.props.isExpanded, {
			event,
			props: this.props,
		});
	}

	render() {
		return (
			<div>
				{this.props.isExpanded ? 'yes' : 'no'}
				<button onClick={this.handleToggle}>click me</button>
			</div>
		);
	}
}

export default buildHybridComponent<IExpanderClassProps, IExpanderClassState>(
	ExpanderClassDumb,
	{ reducers }
);
