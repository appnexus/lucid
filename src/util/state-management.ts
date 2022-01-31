import React, { isValidElement } from 'react';
import _ from 'lodash';
import { logger } from './logger';
import { createSelector } from 'reselect';
import createClass from 'create-react-class';
import hoistNonReactStatics from 'hoist-non-react-statics';

// TODO: could we somehow type the `...args` with a generic?
export type Reducer<S extends object> = (arg0: S, ...args: any[]) => S;

export type Reducers<P, S extends object> = {
	//TODO: used any here to cover cases where a component's reducers file also
	//exports child component reducers, e.g. SingleSelect/DropMenu
	[K in keyof P]?: Reducer<S> | Reducers<P[K], S> | Reducers<P[K], any>;
};

export type Selector<S> = (arg0: S) => any;
export type Selectors<P, S extends object> = {
	[K in keyof P]?: (arg0: S) => any;
};

interface IStateOptions<S extends object> {
	getState: () => S;
	setState: (arg0: S) => void;
}

interface IBoundContext<P, S extends object> {
	getPropReplaceReducers(props: P): {} & S & P;
	getProps(props: P): {} & S & P;
}

interface IBuildHybridComponentOptions<P = {}, S extends object = {}> {
	replaceEvents?: boolean; // TODO: pretty sure this isn't used in anx-react or lucid, I looked through the git history and even when Joe wrote it in 2016 he didn't seem to need it for any concrete use case
	reducers?: Reducers<P, S>;
	selectors?: Selectors<P, S>;
}

interface IBaseComponentType<P> {
	displayName: string;
}

/*
	Returns an array of paths for each reducer function
*/
export function getDeepPaths(
	obj: { [k: string]: any } | null = null,
	path: string[] = []
): string[][] {
	return _.reduce(
		obj,
		(terminalKeys: string[][], value, key) =>
			isPlainObjectOrEsModule(value)
				? //getDeepPaths if value is a module or object (another Reducers)
				  terminalKeys.concat(getDeepPaths(value, path.concat(key)))
				: //add key to terminalKeys (probably a Reducer (function))
				  terminalKeys.concat([path.concat(key)]),
		[]
	);
}

export function isPlainObjectOrEsModule(obj: any): boolean {
	return _.isPlainObject(obj) || _.get(obj, '__esModule', false);
}

/**
	Recursively removes function type properties from obj
 */
export function omitFunctionPropsDeep<P>(obj: object | P | null = null) {
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
		function (...args: any[]) {
			if (_.isEmpty(localPath)) {
				// Source of bug, `reducerFunction` returns undefined
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

/*

*/
export function getStatefulPropsContext<P, S extends object>(
	reducers: Reducers<P, S>,
	{ getState, setState }: IStateOptions<S>
): IBoundContext<P, S> {
	const boundReducers = bindReducersToState(reducers, { getState, setState });

	const combineFunctionsCustomizer = (objValue: any, srcValue: any) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return function (...args: any[]) {
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
 *
 * TODO: the types suck on this function but we spent a couple hours trying to
 * get them to work and we couldn't figure out how to get generics to pass
 * through _.memoize correctly. ¯\_(ツ)_/¯
 */
export const reduceSelectors: any = _.memoize((selectors: object) => {
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
	return createSelector(_.identity as any, (state: { [k: string]: any }) =>
		_.reduce(
			selectors,
			(acc: object, selector: any, key: string) => ({
				...acc,
				[key]: _.isFunction(selector)
					? selector(state)
					: reduceSelectors(selector)(state[key]),
			}),
			state
		)
	);
});

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

export function buildHybridComponent(
	baseComponent: any,
	{
		replaceEvents = false, // if true, function props replace the existing reducers, else they are invoked *after* state reducer returns
		reducers = _.get(baseComponent, 'definition.statics.reducers', {}),
		selectors = _.get(baseComponent, 'definition.statics.selectors', {}),
	} = {}
) {
	const {
		_isLucidHybridComponent,
		displayName,
		propTypes,
		definition: { statics = {} } = {},
		defaultProps,
	} = baseComponent;

	if (_isLucidHybridComponent) {
		logger.warnOnce(
			displayName,
			`Lucid: you are trying to apply buildHybridComponent to ${displayName}, which is already a hybrid component. Lucid exports hybrid components by default. To access the dumb components, use the -Dumb suffix, e.g. "ComponentDumb"`
		);

		return baseComponent;
	}

	const selector = reduceSelectors(selectors);

	return createClass({
		propTypes,
		statics: {
			_isLucidHybridComponent: true,
			peekDefaultProps: defaultProps,
			...statics,
		},
		displayName,
		getInitialState() {
			const { initialState } = this.props; //initial state overrides
			return _.mergeWith(
				{},
				omitFunctionPropsDeep(baseComponent.defaultProps),
				initialState,
				safeMerge
			);
		},
		UNSAFE_componentWillMount() {
			let synchronousState = this.state; //store reference to state, use in place of `this.state` in `getState`
			this.boundContext = getStatefulPropsContext(reducers, {
				getState: () =>
					_.mergeWith(
						{},
						omitFunctionPropsDeep(synchronousState),
						omitFunctionPropsDeep(this.props),
						safeMerge
					),
				setState: (state) => {
					synchronousState = state; //synchronously update the state reference
					this.setState(state);
				},
			});
		},
		render() {
			if (replaceEvents) {
				return React.createElement(
					baseComponent,
					selector(this.boundContext.getPropReplaceReducers(this.props)),
					this.props.children
				);
			}
			return React.createElement(
				baseComponent,
				selector(this.boundContext.getProps(this.props)),
				this.props.children
			);
		},
	});
}

export interface IHybridComponent<P, S extends object> {
	reducers: Reducers<P, S>;
	selectors: Selectors<P, S>;
	peekDefaultProps: { [key: string]: any }; // not sure how to give this a better type
}

export function buildModernHybridComponent<
	P extends object = {},
	S extends object = {},
	BaseType extends object = {}
>(
	BaseComponent: React.ComponentType<P>,
	{
		replaceEvents = false,
		reducers = {},
		selectors = {},
	}: IBuildHybridComponentOptions<P, S>
) {
	// TODO: make sure hybrid components don't get double wrapped. Maybe use a type guard?

	type AugmentedProps = P & { initialState?: P & S };

	const selector = reduceSelectors(selectors);

	class HybridComponent extends React.Component<AugmentedProps, S> {
		private boundContext?: IBoundContext<P, S>;

		// It would be nice to prepend "Hybrid" to this but some of our component
		// sadly rely on the displayName remaining unchanged. E.g. `VerticalListMenu`.
		static displayName = BaseComponent.displayName;

		static propTypes = BaseComponent.propTypes;
		static reducers = reducers;
		static selectors = selectors;
		static peekDefaultProps = BaseComponent.defaultProps;

		// Note: we purposefully *do not* set defaultProps here as that would
		// effectively eliminate our ability to distinguish what props the user
		// explicity included.

		constructor(props: AugmentedProps) {
			super(props);

			const { initialState } = props; // initial state overrides

			this.state = _.mergeWith(
				{},
				omitFunctionPropsDeep(BaseComponent.defaultProps),
				initialState,
				safeMerge
			);
		}

		UNSAFE_componentWillMount() {
			// store reference to state, use in place of `this.state` in `getState`
			let synchronousState: S = this.state;

			this.boundContext = getStatefulPropsContext<P, S>(reducers, {
				getState: () =>
					_.mergeWith(
						{},
						omitFunctionPropsDeep(synchronousState),
						omitFunctionPropsDeep(this.props),
						safeMerge
					) as S,
				setState: (state) => {
					synchronousState = state; //synchronously update the state reference
					this.setState(state);
				},
			});
		}

		render() {
			if (this.boundContext === undefined) {
				return null;
			}

			if (replaceEvents) {
				return React.createElement(
					BaseComponent,
					selector(this.boundContext.getPropReplaceReducers(this.props)),
					this.props.children
				);
			}

			return React.createElement(
				BaseComponent,
				selector(this.boundContext.getProps(this.props)),
				this.props.children
			);
		}
	}

	// I used a type cast and intersection with `BaseType` here because I
	// couldn't figure out any other way to generate a valid type signuture to
	// reflected all the statics on the unerlying base component. @jondlm 2019-11-27
	// @ts-ignore
	return hoistNonReactStatics(HybridComponent, BaseComponent) as BaseType &
		IHybridComponent<P, S>;
}

/*
export function buildStatefulComponent(...args: any[]) {
	logger.warnOnce(
		'buildHybridComponent-once',
		'Lucid: buildStatefulComponent has been renamed to buildHybridComponent.'
	);

	// We don't really care about type checking our legacy buildHybridComponent
	// @ts-ignore
	return buildHybridComponent(...args);
}
	 */
