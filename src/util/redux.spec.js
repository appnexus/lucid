import assert from 'assert';
import sinon from 'sinon';
import {
	assign,
	isFunction,
	upperCase
} from 'lodash';

import {
	thunk,
	getReduxPrimitives
} from './redux';

describe('#thunk', () => {
	it('should set `isThunk` property on the input function to `true`', () => {
		assert(thunk(function() {}).isThunk, 'must have `isThunk`');
	});
});

describe('#getReduxPrimitives', () => {

	const reducers = {
		foo: {
			onChange: (state, payload) => {
				return ({ value: payload });
			},
			bar: {
				onChange: (state, payload) => ({ value: payload })
			},
			asyncOperation: thunk(payload => dispatchTree => Promise.resolve(payload).then(dispatchTree.onChange))
		}
	};

	const initialState = {
		foo: {
			value: 'foo',
			bar: {
				value: null
			}
		}
	};

	describe('reducer', () => {

		const { reducer } = getReduxPrimitives({ reducers, initialState });

		it('should return initialState on unmatched type', () => {
			const action = { type: 'UNKNOWN' };
			assert.deepEqual(reducer(initialState, action), initialState);
		});

		it('should correctly apply state change', () => {
			const action = { type: 'foo.onChange', payload: 'bar' };
			const nextState = reducer(initialState, action);
			assert.equal(nextState.foo.value, 'bar');
		});

		describe('nested reducer', () => {

			it('should correctly apply state change', () => {
				const action = { type: 'foo.bar.onChange', payload: 'baz' };
				const nextState = reducer(initialState, action);
				assert.equal(nextState.foo.bar.value, 'baz');
			});

		});

		describe('with rootPath', () => {

			const { reducer: reducerWithRootPath } = getReduxPrimitives({
				reducers,
				initialState,
				rootPath: ['root']
			});

			it('should correctly apply state change', () => {
				const action = { type: 'root.foo.onChange', payload: 'bar' };
				const nextState = reducerWithRootPath(initialState, action);
				assert.equal(nextState.foo.value, 'bar');
			});

		});

		describe('thunks', () => {
			it('should not include thunk paths in reducer', () => {
				const action = { type: 'root.foo.asyncOperation' };
				const nextState = reducer(initialState, action);
				assert.deepEqual(initialState, nextState);
			});
		});

	});

	describe('connectors', () => {
		describe('selector/mapStateToProps', () => {

			const selectors = {
				foo: {
					uppercase: ({ value }) => upperCase(value)
				}
			};

			const {
				connectors: [mapStateToProps]
			} = getReduxPrimitives({
				reducers,
				initialState,
				selectors
			});

			it('should apply selector', () => {
				const viewState = mapStateToProps(initialState);
				assert.equal(viewState.foo.uppercase, 'FOO');
			});

			describe('rootPath', () => {

				const {
					connectors: [mapStateToProps]
				} = getReduxPrimitives({
					reducers,
					initialState,
					selectors,
					rootPath: ['root']
				});

				it('should apply selector', () => {
					const viewState = mapStateToProps({ root: initialState });
					assert.equal(viewState.foo.uppercase, 'FOO');
				});

			});

			describe('rootSelector', () => {

				const {
					connectors: [mapStateToProps]
				} = getReduxPrimitives({
					reducers,
					initialState,
					selectors,
					rootSelector: state => assign({}, state, {
						computed: state.foo.uppercase + state.foo.value
					})
				});

				it('should apply rootSelector', () => {
					const viewState = mapStateToProps(initialState);
					assert.equal(viewState.computed, 'FOOfoo');
				});

			});
		});

		describe('dispatchTree/mapDispatchToProps', () => {

			const {
				connectors
			} = getReduxPrimitives({
				reducers,
				initialState
			});

			const mapDispatchToProps = connectors[1];
			const mockDispatch = sinon.spy(action => isFunction(action) ? action(mockDispatch) : action);
			const dispatchTree = mapDispatchToProps(mockDispatch);

			beforeEach(() => mockDispatch.reset());

			it('should dispatch the correct action', () => {
				dispatchTree.foo.onChange('bar', 'baz');
				const dispatchedAction = mockDispatch.getCall(0).args[0];
				assert.deepEqual(dispatchedAction, {
					type: 'foo.onChange',
					payload: 'bar',
					meta: ['baz']
				});
			});

			describe('thunks', () => {

				beforeEach(() => dispatchTree.foo.asyncOperation('qux'));

				it('should dispatch a thunk', () => {
					const dispatchedThunk = mockDispatch.getCall(0).args[0];
					assert(isFunction(dispatchedThunk))
				});

				it('should dispatch the correct action', () => {
					const dispatchedAction = mockDispatch.getCall(1).args[0];
					assert.deepEqual(dispatchedAction, {
						type: 'foo.onChange',
						payload: 'qux',
						meta: []
					});
				});

			});

		});

	});
});
