import _ from 'lodash';
import { createSelector } from 'reselect';

/**
 * thunk
 *
 * Marks a function on the reducer tree as a thunk action creator so it doesn't
 * get incorporated into the redux reducer
 *
 * @return {function} with `isThunk` set to `true`
 */
export function thunk(fn) {
	fn.isThunk = true;
	return fn;
}

/**
 * getReduxPrimitives
 *
 * Creates a redux reducer and connectors (inputs to redux-react's `connect`)
 *
 * @param {Object} param
 * @param {Object} param.initialState - the initial state object that the reducer will return
 * @param {Object} param.reducers - a tree of lucid reducers
 * @param {string[]} param.rootPath - array of strings representing the path to local state in global state
 * @param {Object} param.selectors - a tree of lucid selectors
 * @return {Object} redux reducer and connectors
 */

export function getReduxPrimitives({
	initialState,
	reducers,
	rootPath = [],
	rootSelector = _.identity,
	selectors
}) {

	// we need this in scope so actionCreators can refer to it
	let dispatchTree;

	const reducer = createReduxReducer(reducers, initialState, rootPath);
	const selector = selectors ? reduceSelectors(selectors) : _.identity;
	const rootPathSelector = state => _.isEmpty(rootPath) ? state : _.get(state, rootPath);
	const mapStateToProps = createSelector(
		[rootPathSelector],
		rootState => rootSelector(selector(rootState))
	);
	const mapDispatchToProps = dispatch => getDispatchTree(reducers, rootPath, dispatch);

	return {
		reducer,
		connectors: [
			mapStateToProps,
			mapDispatchToProps,
			mergeProps
		]
	};

	/**
	 * createActionCreator
	 *
	 * @param {function} node - a node in the the reducer tree, either a reducer or a thunk
	 * @param {string[]} path - the path to the reducer in the reducer tree
	 * @param {string[]} rootPath - array of strings representing the path to local state in global state
	 * @return {function} action creator that returns either an action or a thunk
	 */
	function createActionCreator(node, path, rootPath) {
		if (node.isThunk) {
			return function thunk(...args) {
				return function thunkInner(dispatch, getState) {
					const localPath = _.slice(path, rootPath.length, -1);
					const localDispatchTree = _.isEmpty(localPath) ? dispatchTree : _.get(dispatchTree, localPath);
					const getLocalState = _.isEmpty(rootPath) ? getState : () => _.get(getState(), _.slice(path, 0, -1));
					return node(...args)(localDispatchTree, getLocalState, dispatch, getState);
				};
			};
		}
		return function actionCreator(payload, ...meta) {
			return {
				type: path.join('.'),
				payload,
				meta
			};
		};
	}

	/**
	 * createActionCreatorTree
	 *
	 * Walks the reducer tree and generates a tree of action creators that correspond to each reducer
	 * @param {Object} reducers - a tree of lucid reducers
	 * @param {string[]} rootPath - array of strings representing the path to local state in global state
	 * @returns {Object} action creator tree
	 */
	function createActionCreatorTree(reducers, rootPath) {
		return (function recur(reducers, path = []) {
			return _.reduce(reducers, (memo, node, key) => {
				const currentPath = path.concat(key);
				return _.assign(memo, {
					[key]: _.isFunction(node) ?
						createActionCreator(node, currentPath, rootPath) :
						recur(node, currentPath)
				});
			}, {});
		})(reducers, rootPath);
	}

	/**
	 * getDispatchTree
	 *
	 * Walks the reducer tree and generates an action creator tree, then binds dispatch to each node
	 * @param {Object} reducers - a tree of lucid reducers
	 * @param {string[]} rootPath - array of strings representing the path to local state in global state
	 * @param {function} dispatch - the redux store's `dispatch` function
	 */
	function getDispatchTree(reducers, rootPath, dispatch) {
		const actionCreatorTree = createActionCreatorTree(reducers, rootPath);
		dispatchTree = bindActionCreatorTree(actionCreatorTree, dispatch);
		return dispatchTree;
	}

}

/**
 * createReduxReducerTree
 *
 * Walks the reducer tree and generates a tree of redux reducers, converting the
 * signature from `(state, payload) => state` to `(state, action) => state`
 * @param {Object} reducers - a tree of lucid reducers
 * @param {string[]} path - array of strings representing the path to the reducer
 * @return {Object} redux reducer tree
 */
function createReduxReducerTree(reducers, path = []) {
	return _.reduce(reducers, (memo, node, key) => {
		// filter out thunks from the reducer tree
		if (node.isThunk) {
			return memo;
		}
		const currentPath = path.concat(key);
		return _.assign(memo, {
			[key]: _.isFunction(node) ?
				function reduxReducer(state, action) {
					const { type, payload, meta = [] } = action;
					if (_.isUndefined(state) || type !== currentPath.join('.')) {
						return state;
					}
					return node(state, payload, ...meta);
				} :
				createReduxReducerTree(node, currentPath)
		});
	}, {});
}

/**
 * createReducerFromReducerTree
 *
 * Returns a function that calls every reducer in the reducer tree with the reducer's local state and action
 * @param {Object} reduxReducerTree - tree of redux reducers with signature `(state, action) => state`
 * @param {Object} initialState - the initial state object that the reducer will return
 * @return {function} the redux reducer
 */
function createReducerFromReducerTree(reduxReducerTree, initialState) {
	return function reduxReducer(state, action) {
		if (_.isUndefined(state)) {
			return initialState;
		}
		return _.reduce(reduxReducerTree, (state, node, key) => {
			return _.assign({}, state, _.isFunction(node) ? node(state, action) : {
				[key]: createReducerFromReducerTree(node)(state[key], action)
			});
		}, state);
	};
}

/**
 * createReduxReducer
 *
 * Generates a redux reducer from a tree of lucid reducers
 * @param {Object} reducers - a tree of lucid reducers
 * @param {Object} initialState - the initial state object that the reducer will return
 * @return {function} the redux reducer
 */
function createReduxReducer(reducers, initialState, rootPath) {
	const reducerTree = createReduxReducerTree(reducers, rootPath);
	return createReducerFromReducerTree(reducerTree, initialState);
}

/**
 * bindActionCreatorTree
 *
 * Binds redux store.dispatch to actionCreators in a tree
 * @param {Object} actionCreatorTree - a tree of redux action creator functions
 * @param {function} dispatch - the redux store's `dispatch` function
 * @param {string[]} path - array of strings representing the path to the action creator
 */
function bindActionCreatorTree(actionCreatorTree, dispatch, path = []) {
	return _.reduce(actionCreatorTree, (memo, node, key) => _.assign(memo, {
		[key]: _.isFunction(node) ? function boundActionCreator(...args) {
			const action = actionCreatorTree[key](...args);
			return dispatch(action);
		} : bindActionCreatorTree(node, dispatch, path.concat(key))
	}), {});
}

/**
 * reduceSelectors
 *
 * Generates a root selector from a tree of selectors
 * @param {Object} selectors - a tree of selectors
 * @returns {function} root selector that when called with state, calls each of
 * the selectors in the tree with the state local to that selector
 */
// @TODO: optimize to create and reuse selectors?
function reduceSelectors(selectors) {
	return function reducedSelector(state) {
		return _.reduce(selectors, (state, selector, key) => _.assign({}, state, {
			[key]: _.isFunction(selector) ?
				selector(state) :
				reduceSelectors(selector)(state[key])
		}), state);
	};
}

/**
 * mergeProps
 *
 * Merges state, dispatchTree, and ownProps into a single props object
 * @param {Object} state
 * @param {Object} dispatchTree
 * @param {Object} ownProps
 * @return {Object}
 */
function mergeProps(state, dispatchTree, ownProps) {
	return _.merge({}, state, dispatchTree, ownProps);
}
