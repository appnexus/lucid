import assert from 'assert';
import sinon from 'sinon';
import { isFunction, upperCase } from 'lodash';

import { cleanArgs, thunk, getReduxPrimitives } from './redux';

describe('redux utils', () => {
	describe('#cleanArgs', () => {
		it('it should remove the last element if it has an `event` property', () => {
			assert.deepEqual(cleanArgs(['foo', 'bar', { event: 'event' }]), [
				'foo',
				'bar',
			]);
			assert.deepEqual(cleanArgs(['foo', 'bar', { event: null }]), [
				'foo',
				'bar',
			]);
		});

		it('it should not remove the last element if it has no `event` property', () => {
			assert.deepEqual(cleanArgs(['foo', 'bar']), ['foo', 'bar']);
		});
	});

	describe('#thunk', () => {
		it('should set `isThunk` property on the input function to `true`', () => {
			assert(thunk(function() {}).isThunk, 'must have `isThunk`');
		});
	});

	describe('#getReduxPrimitives', () => {
		const reducers = {
			foo: {
				onChange: (state, payload) => {
					return { value: payload };
				},
				bar: {
					onChange: (state, payload) => ({ value: payload }),
				},
			},
		};

		const initialState = {
			foo: {
				value: 'foo',
				bar: {
					value: null,
				},
			},
		};

		describe('reducer', () => {
			const { reducer } = getReduxPrimitives({ reducers, initialState });

			it('should return initialState on unmatched type', () => {
				const action = { type: 'UNKNOWN' };
				assert.deepEqual(
					reducer(initialState, action),
					initialState,
					'must deep equal initialState'
				);
			});

			it('should correctly apply state change', () => {
				const action = { type: 'foo.onChange', payload: 'bar' };
				const nextState = reducer(initialState, action);
				assert.equal(nextState.foo.value, 'bar', 'must equal action payload');
			});

			describe('nested reducer', () => {
				it('should correctly apply state change', () => {
					const action = { type: 'foo.bar.onChange', payload: 'baz' };
					const nextState = reducer(initialState, action);
					assert.equal(
						nextState.foo.bar.value,
						'baz',
						'must equal action payload'
					);
				});
			});

			describe('with rootPath', () => {
				const { reducer: reducerWithRootPath } = getReduxPrimitives({
					reducers,
					initialState,
					rootPath: ['root'],
				});

				it('should correctly apply state change', () => {
					const action = { type: 'root.foo.onChange', payload: 'bar' };
					const nextState = reducerWithRootPath(initialState, action);
					assert.equal(nextState.foo.value, 'bar', 'must equal action payload');
				});
			});

			describe('thunks', () => {
				it('should not include thunk paths in reducer', () => {
					const action = { type: 'root.foo.asyncOperation' };
					const nextState = reducer(initialState, action);
					assert.deepEqual(
						initialState,
						nextState,
						'must deep equal initialState'
					);
				});
			});
		});

		describe('connectors', () => {
			describe('selector/mapStateToProps', () => {
				const selectors = {
					foo: {
						uppercase: ({ value }) => upperCase(value),
					},
				};

				const { connectors: [mapStateToProps] } = getReduxPrimitives({
					reducers,
					initialState,
					selectors,
				});

				it('should apply selector', () => {
					const viewState = mapStateToProps(initialState);
					assert.equal(viewState.foo.uppercase, 'FOO', 'must equal "FOO"');
				});

				describe('rootPath', () => {
					const { connectors: [mapStateToProps] } = getReduxPrimitives({
						reducers,
						initialState,
						selectors,
						rootPath: ['root'],
					});

					it('should apply selector', () => {
						const viewState = mapStateToProps({ root: initialState });
						assert.equal(viewState.foo.uppercase, 'FOO', 'must equal "FOO"');
					});
				});

				describe('rootSelector', () => {
					const { connectors: [mapStateToProps] } = getReduxPrimitives({
						reducers,
						initialState,
						selectors,
						rootSelector: state => ({
							...state,
							computed: state.foo.uppercase + state.foo.value,
						}),
					});

					it('should apply rootSelector', () => {
						const viewState = mapStateToProps(initialState);
						assert.equal(viewState.computed, 'FOOfoo', 'must equal "FOOfoo"');
					});
				});
			});

			describe('dispatchTree/mapDispatchToProps', () => {
				describe('synchronous dispatch', () => {
					const rootState = {
						qux: {
							quux: {
								foo: {
									value: 'foo',
									bar: {
										value: null,
									},
								},
							},
						},
					};

					const initialState = rootState.qux.quux;

					const { connectors } = getReduxPrimitives({
						reducers,
						initialState,
						rootPath: ['qux', 'quux'],
					});

					const mockDispatch = sinon.spy(action => action);
					const mapDispatchToProps = connectors[1];
					const dispatchTree = mapDispatchToProps(mockDispatch);

					beforeEach(() => {
						mockDispatch.reset();
					});

					it('should dispatch the correct action', () => {
						dispatchTree.foo.onChange('bar', 'baz');
						const dispatchedAction = mockDispatch.getCall(0).args[0];
						assert.deepEqual(
							dispatchedAction,
							{
								type: 'qux.quux.foo.onChange',
								payload: 'bar',
								meta: ['baz'],
							},
							'must include path as type, first param as payload, and subsequent params as meta'
						);
					});
				});

				describe('thunks', () => {
					const thunkSpy = sinon.spy();

					const reducers = {
						foo: {
							onChange: (state, payload) => {
								return { value: payload };
							},
							bar: {
								onChange: (state, payload) => ({ value: payload }),
							},
							asyncOperation: thunk(payload => dispatchTree =>
								dispatchTree.onChange(payload)),
							thunkSpy: thunk(() => thunkSpy),
						},
					};

					const rootState = {
						qux: {
							quux: {
								foo: {
									value: 'foo',
									bar: {
										value: null,
									},
								},
							},
						},
					};

					const initialState = rootState.qux.quux;

					const { connectors } = getReduxPrimitives({
						reducers,
						initialState,
						rootPath: ['qux', 'quux'],
					});

					const extraArgs = ['rest1', 'rest2'];

					const mapDispatchToProps = connectors[1];
					const mockGetState = sinon.spy(() => rootState);
					const mockDispatch = sinon.spy(
						action =>
							(isFunction(action)
								? action(mockDispatch, mockGetState, ...extraArgs)
								: action)
					);
					const dispatchTree = mapDispatchToProps(mockDispatch);

					beforeEach(() => {
						thunkSpy.reset();
						dispatchTree.foo.asyncOperation('qux');
					});

					it('should dispatch a thunk', () => {
						const dispatchedThunk = mockDispatch.getCall(0).args[0];
						assert(isFunction(dispatchedThunk), 'must be a function');
					});

					it('should dispatch the correct action', () => {
						const dispatchedAction = mockDispatch.getCall(1).args[0];
						assert.deepEqual(
							dispatchedAction,
							{
								type: 'qux.quux.foo.onChange',
								payload: 'qux',
								meta: [],
							},
							'must include path as type and param on payload'
						);
					});

					it('should call the thunk with the correct arguments', () => {
						dispatchTree.foo.thunkSpy();

						const {
							args: [
								localDispatchTree,
								getLocalState,
								dispatch,
								getState,
								...rest
							],
						} = thunkSpy.getCall(0);

						assert.equal(
							dispatchTree.foo,
							localDispatchTree,
							'must be called with local dispatchTree'
						);
						assert.equal(
							getLocalState(),
							rootState.qux.quux.foo,
							'must be called with getLocalState'
						);
						assert.equal(
							dispatch,
							mockDispatch,
							'must be called with redux.dispatch'
						);
						assert.equal(
							getState,
							mockGetState,
							'must be called with redux.getState'
						);
						assert.deepEqual(
							rest,
							extraArgs,
							'must pass through extra arguments'
						);
					});
				});
			});
		});
	});
});
