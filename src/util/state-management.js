import React, { isValidElement } from 'react';
import _ from 'lodash';
import { logger } from './logger';
import { createSelector } from 'reselect';
import createClass from 'create-react-class';

export function getDeepPaths(obj, path = []) {
	return _.reduce(
		obj,
		(terminalKeys, value, key) =>
			(_.isPlainObject(value)
				? terminalKeys.concat(getDeepPaths(value, path.concat(key)))
				: terminalKeys.concat([path.concat(key)])),
		[]
	);
}

export function omitFunctionPropsDeep(obj) {
	return _.reduce(
		obj,
		(memo, value, key) => {
			if (_.isPlainObject(value)) {
				memo[key] = omitFunctionPropsDeep(value);
			} else if (!_.isFunction(value)) {
				memo[key] = value;
			}
			return memo;
		},
		{}
	);
}

export function bindReducerToState(
	reducerFunction,
	{ getState, setState },
	path = []
) {
	const localPath = _.take(path, _.size(path) - 1);
	return _.assign(
		function(...args) {
			if (_.isEmpty(localPath)) {
				setState(reducerFunction(getState(), ...args));
			} else {
				const localNextState = reducerFunction(
					_.get(getState(), localPath),
					...args
				);
				setState(_.set(_.clone(getState()), localPath, localNextState));
			}
		},
		{ path }
	);
}

export function bindReducersToState(reducers, { getState, setState }) {
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

export function getStatefulPropsContext(reducers, { getState, setState }) {
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
export const reduceSelectors = _.memoize(selectors => {
	if (!_.isPlainObject(selectors)) {
		throw new Error(
			'Selectors must be a plain object with function or plain object values'
		);
	}

	/**
	 * For each iteration of `reduceSelectors`, we return a memoized selector so
	 * that individual branches maintain reference equality if they haven't been
	 * modified, even if a sibling (and therefore the parent) has been modified.
	 */
	return createSelector(_.identity, state =>
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
});

export function safeMerge(objValue, srcValue) {
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
	baseComponent,
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
			...statics,
		},
		displayName,
		getInitialState() {
			const { initialState } = this.props; //initial state overrides
			return _.mergeWith(
				{},
				omitFunctionPropsDeep(baseComponent.getDefaultProps()),
				initialState,
				omitFunctionPropsDeep(this.props),
				safeMerge
			);
		},
		componentWillMount() {
			let synchronousState = this.state; //store reference to state, use in place of `this.state` in `getState`
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

export function buildStatefulComponent(...args) {
	logger.warnOnce(
		'buildHybridComponent-once',
		'Lucid: buildStatefulComponent has been renamed to buildHybridComponent.'
	);
	return buildHybridComponent(...args);
}
