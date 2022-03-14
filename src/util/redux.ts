import _ from 'lodash';
import { createSelector } from 'reselect';
import { reduceSelectors, safeMerge } from './state-management';
import { logger, isDevMode } from './logger';

export type Funk = (...args: any) => any;
export interface IThunk {
	isThunk?: boolean;
}
export type FunkThunk = Funk & IThunk;

/**
 * Marks a function on the reducer tree as a thunk action creator so it doesn't
 * get incorporated into the redux reducer
 *
 * @return {function} with `isThunk` set to `true`
 */

export function thunk(fn: FunkThunk) {
	fn.isThunk = true;
	return fn;
}

/**
 * Creates a redux reducer and connectors (inputs to redux-react's `connect`)
 *
 * @param {Object} param
 * @param {Object} param.initialState - the initial state object that the reducer will return
 * @param {Object} param.reducers - a tree of lucid reducers
 * @param {string[]} param.rootPath - array of strings representing the path to local state in global state
 * @param {function} param.rootSelector - a top-level selector which takes as input state that has run through every selector in param.selectors
 * @param {Object} param.selectors - a tree of lucid selectors
 * @return {Object} redux reducer and connectors
 */

interface IGetReduxPrimitives {
	initialState: object;
	reducers: object;
	rootPath?: string[];
	rootSelector?: (arg0: any) => any;
	selectors?: object;
}
export function getReduxPrimitives({
	initialState,
	reducers,
	rootPath = [],
	rootSelector = _.identity,
	selectors,
}: IGetReduxPrimitives) {
	/* istanbul ignore if */
	if (isDevMode && _.isEmpty(rootPath)) {
		logger.warn(
			`\`getReduxPrimitives\` warning:
\`rootPath\` is empty`
		);
	}

	/* istanbul ignore if */
	if (isDevMode && !initialState) {
		logger.warn(
			`\`getReduxPrimitives\` warning:
Missing \`initialState\` for component at \`rootPath\` ${
				_.isArray(rootPath) ? rootPath.join(',') : rootPath
			}
Components should have an \`initialState\` property or a \`getDefaultProps\` defined.
`
		);
	}

	// we need this in scope so actionCreators can refer to it
	let dispatchTree: object;

	const reducer = createReduxReducer(reducers, initialState, rootPath);
	const selector = selectors ? reduceSelectors(selectors) : _.identity;
	const rootPathSelector = (state: object) =>
		_.isEmpty(rootPath) ? state : _.get(state, rootPath);

	const mapStateToProps = createSelector([rootPathSelector], (rootState) =>
		rootSelector(selector(rootState))
	);
	// dispatch could be store.dispatch's return value or an async lib's return value?
	const mapDispatchToProps = (dispatch: Funk) =>
		getDispatchTree(reducers, rootPath, dispatch);
	const devModeMapStateToProps = (rootState: object) => {
		/* istanbul ignore if */
		if (isDevMode && !_.has(rootState, rootPath)) {
			logger.warn(
				`\`getReduxPrimitives\` warning:
\`rootPath\` ${rootPath} does not exist in the redux store.
Make sure your \`rootPath\` is correct.
`
			);
		}
		return mapStateToProps(rootState);
	};

	return {
		reducer,
		connectors: [
			isDevMode ? devModeMapStateToProps : mapStateToProps,
			mapDispatchToProps,
			mergeProps,
		],
	};

	/**
	 * @param {function} node - a node in the the reducer tree, either a reducer or a thunk
	 * @param {string[]} path - the path to the reducer in the reducer tree
	 * @param {string[]} rootPath - array of strings representing the path to local state in global state
	 * @return {function} action creator that returns either an action or a thunk
	 */
	function createActionCreator(
		node: Funk | FunkThunk,
		rootPath: string[],
		path: string[]
	) {
		if ((node as FunkThunk).isThunk) {
			return function thunk(...args: any[]) {
				return function thunkInner(
					dispatch: Funk,
					getState: Funk,
					...rest: any[]
				) {
					const pathToLocalDispatchTree = _.slice(path, rootPath.length, -1);
					const pathToLocalState = _.dropRight(path);
					const localDispatchTree = _.isEmpty(pathToLocalDispatchTree)
						? dispatchTree
						: _.get(dispatchTree, pathToLocalDispatchTree);
					const getLocalState = _.isEmpty(pathToLocalState)
						? getState
						: () => _.get(getState(), pathToLocalState);
					return node(...args)(
						localDispatchTree,
						getLocalState,
						dispatch,
						getState,
						...rest
					);
				};
			};
		}
		return function actionCreator(...args: any[]) {
			const [payload, ...meta] = isDevMode ? cleanArgs(args) : args;

			return {
				type: path.join('.'),
				payload,
				meta,
			};
		};
	}

	/**
	 * Walks the reducer tree and generates a tree of action creators that correspond to each reducer
	 * @param {Object} reducers - a tree of lucid reducers
	 * @param {string[]} rootPath - array of strings representing the path to local state in global state
	 * @returns {Object} action creator tree
	 */
	function createActionCreatorTree(
		reducers: object,
		rootPath: string[],
		path: string[] = rootPath
	): object {
		return _.reduce(
			reducers,
			(memo, node, key) => {
				const currentPath = path.concat(key);
				return {
					...memo,
					[key]: _.isFunction(node)
						? createActionCreator(node, rootPath, currentPath)
						: createActionCreatorTree(node, rootPath, currentPath),
				};
			},
			{}
		);
	}

	/**
	 * Walks the reducer tree and generates an action creator tree, then binds dispatch to each node
	 * @param {Object} reducers - a tree of lucid reducers
	 * @param {string[]} rootPath - array of strings representing the path to local state in global state
	 * @param {function} dispatch - the redux store's `dispatch` function
	 */
	function getDispatchTree(
		reducers: object,
		rootPath: string[],
		dispatch: Funk
	) {
		const actionCreatorTree = createActionCreatorTree(reducers, rootPath);
		dispatchTree = bindActionCreatorTree(actionCreatorTree, dispatch);
		/* istanbul ignore if */
		if (isDevMode) {
			//@ts-ignore
			window.lucidReduxUtil = window.lucidReduxUtil || {};
			//@ts-ignore
			window.lucidReduxUtil[rootPath] = {
				actionCreatorTree,
				dispatchTree,
			};
		}
		return dispatchTree;
	}
}

/**
 * Walks the reducer tree and generates a tree of redux reducers, converting the
 * signature from `(state, payload) => state` to `(state, action) => state`
 * @param {Object} reducers - a tree of lucid reducers
 * @param {string[]} path - array of strings representing the path to the reducer
 * @return {Object} redux reducer tree
 */

type PayloadReducer = (state: object, payload: any, ...args: any) => any;
type ActionReducer = (state: object, action: object, ...args: any) => any;

function createReduxReducerTree(reducers: object, path: string[] = []): object {
	return _.reduce(
		reducers,
		(memo, node, key) => {
			// filter out thunks from the reducer tree
			if ((node as FunkThunk).isThunk) {
				return memo;
			}
			const currentPath = path.concat(key);
			return {
				...memo,
				[key]: _.isFunction(node)
					? function reduxReducer(
							state: object,
							action: {
								type: any;
								payload: any;
								meta: [];
							}
					  ) {
							const { type, payload, meta = [] } = action;
							if (_.isUndefined(state) || type !== currentPath.join('.')) {
								return state;
							}
							return (node as PayloadReducer)(state, payload, ...meta);
					  }
					: createReduxReducerTree(node, currentPath),
			};
		},
		{}
	);
}

/**
 * Returns a function that calls every reducer in the reducer tree with the reducer's local state and action
 * @param {Object} reduxReducerTree - tree of redux reducers with signature `(state, action) => state`
 * @param {Object} initialState - the initial state object that the reducer will return
 * @return {function} the redux reducer
 */
function createReducerFromReducerTree(
	reduxReducerTree: object,
	initialState: object
) {
	return function reduxReducer(state: any, action: object): object | Funk {
		if (_.isUndefined(state)) {
			return initialState;
		}
		return _.reduce(
			reduxReducerTree,
			(state, node, key) => {
				return {
					...state,
					...(_.isFunction(node)
						? (node as ActionReducer)(state, action)
						: {
								[key]: createReducerFromReducerTree(node, {})(
									state[key],
									action
								),
						  }),
				};
			},
			state
		);
	};
}

/**
 * Generates a redux reducer from a tree of lucid reducers
 * @param {Object} reducers - a tree of lucid reducers
 * @param {Object} initialState - the initial state object that the reducer will return
 * @param {string[]} rootPath - array of strings representing the path to part of global state this reducer applies to
 * @return {function} the redux reducer
 */
function createReduxReducer(
	reducers: object,
	initialState: object,
	rootPath: string[]
) {
	const reducerTree = createReduxReducerTree(reducers, rootPath);
	return createReducerFromReducerTree(reducerTree, initialState);
}

/**
 * Binds redux store.dispatch to actionCreators in a tree
 * @param {Object} actionCreatorTree - a tree of redux action creator functions
 * @param {function} dispatch - the redux store's `dispatch` function
 * @param {string[]} path - array of strings representing the path to the action creator
 */
function bindActionCreatorTree(
	actionCreatorTree: any,
	dispatch: Funk,
	path: string[] = []
): object {
	return _.reduce(
		actionCreatorTree,
		(memo, node, key: string) => ({
			...memo,
			[key]: _.isFunction(node)
				? function boundActionCreator(...args: any) {
						const action = actionCreatorTree[key](...args);
						return dispatch(action);
				  }
				: bindActionCreatorTree(node, dispatch, path.concat(key)),
		}),
		// @ts-ignore
		{}
	);
}

/**
 * Merges state, dispatchTree, and ownProps into a single props object
 * @param {Object} state
 * @param {Object} dispatchTree
 * @param {Object} ownProps
 * @return {Object}
 */
const mergeProps = _.memoize((state, dispatchTree, ownProps) => {
	return _.mergeWith({}, state, dispatchTree, ownProps, safeMerge);
});

/**
 * Checks the last element of the array and
 * if it is an 'event' object, it removes it
 * Otherwise it just returns the array
 * @param {any[]} - an array of args
 */
export function cleanArgs(args: any[]) {
	return _.has(_.last(args), 'event') ? _.dropRight(args) : args;
}
