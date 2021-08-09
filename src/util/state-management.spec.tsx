import assert from 'assert';
import _ from 'lodash';
import sinon from 'sinon';
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import {
	getDeepPaths,
	omitFunctionPropsDeep,
	bindReducerToState,
	bindReducersToState,
	getStatefulPropsContext,
	reduceSelectors,
	safeMerge,
	buildHybridComponent,
} from './state-management';
import { createClass } from './component-types';

describe('#getDeepPaths', () => {
	it('should return an empty array when arg is empty object, null, or undefined', () => {
		assert(_.isEqual([], getDeepPaths({})));
		assert(_.isEqual([], getDeepPaths()));
		assert(_.isEqual([], getDeepPaths(null)));
	});

	it('should return an array of paths for each node with non-plain object value if arg is object', () => {
		const pagedTableObj = {
			rows: ['data0', 'data1'],
			paginator: {
				selectedPageIndex: 0,
				selectedPageSize: 10,
				dropselector: {
					selectedIndex: 1,
					options: [5, 10, 20],
				},
			},
		};

		const deepPaths = getDeepPaths(pagedTableObj);
		const xorPaths = _.xorWith(
			deepPaths,
			[
				['rows'],
				['paginator', 'selectedPageIndex'],
				['paginator', 'selectedPageSize'],
				['paginator', 'dropselector', 'selectedIndex'],
				['paginator', 'dropselector', 'options'],
			],
			_.isEqual
		);
		assert(_.isEqual([], xorPaths));
	});

	it('should return an array of paths for each node with non-plain object value if arg is array', () => {
		const deepPaths = getDeepPaths(['zero', { one: 1 }, 2]);
		const xorPaths = _.xorWith(deepPaths, [[0], [1, 'one'], [2]], _.isEqual);
		assert(_.isEqual([], xorPaths));
	});
});

describe('#omitFunctionPropsDeep', () => {
	it('should return an empty object when arg is empty object, null, or undefined', () => {
		assert(_.isEqual({}, omitFunctionPropsDeep({})));
		assert(_.isEqual({}, omitFunctionPropsDeep(null)));
		assert(_.isEqual({}, omitFunctionPropsDeep()));
	});

	it('should transform to object without function properties', () => {
		const pagedTableObj = {
			rows: ['data0', 'data1'],
			onRowSelect: _.noop,
			paginator: {
				selectedPageIndex: 0,
				selectedPageSize: 10,
				onPageSizeSelect: _.noop,
				onPageSelect: _.noop,
				dropselector: {
					selectedIndex: 1,
					options: [5, 10, 20],
					onSelect: _.noop,
				},
			},
		};

		const result = omitFunctionPropsDeep(pagedTableObj);

		assert(
			_.isEqual(result, {
				rows: ['data0', 'data1'],
				paginator: {
					selectedPageIndex: 0,
					selectedPageSize: 10,
					dropselector: {
						selectedIndex: 1,
						options: [5, 10, 20],
					},
				},
			})
		);
	});
});

describe('#bindReducerToState', () => {
	it('should bind a single reducer function to a state management interface', () => {
		let state = {
			value: null,
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState: any) {
				state = nextState;
			},
		};

		function setValue(state: any, value: any) {
			return _.assign({}, state, { value });
		}

		const boundSetValue = bindReducerToState(setValue, stateManager);

		assert.equal(state.value, null);
		boundSetValue('foo');
		assert.equal(state.value, 'foo');
	});

	it('should bind a single, nested reducer function to a state management interface', () => {
		let state = {
			sub: {
				value: null,
			},
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState: any) {
				state = nextState;
			},
		};

		function setValue(state: any, value: any) {
			return _.assign({}, state, { value });
		}

		const boundSetValue = bindReducerToState(setValue, stateManager, [
			'sub',
			'setValue',
		]);

		assert.equal(state.sub.value, null);
		boundSetValue('foo');
		assert.equal(state.sub.value, 'foo');
	});
});

describe('#bindReducersToState', () => {
	it('should bind an object of reducers functions to a state management interface', () => {
		let state = {
			counter: 0,
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState: any) {
				state = nextState;
			},
		};

		const reducers = {
			increaseCounter: (state: any) =>
				_.assign({}, state, {
					counter: state.counter + 1,
				}),
			decreaseCounter: (state: any) =>
				_.assign({}, state, {
					counter: state.counter - 1,
				}),
			setCounter: (state: any, x: any) =>
				_.assign({}, state, {
					counter: x,
				}),
		};

		const boundReducers: any = bindReducersToState(reducers, stateManager);

		assert.equal(state.counter, 0);
		boundReducers.increaseCounter();
		assert.equal(state.counter, 1);
		boundReducers.setCounter(32);
		assert.equal(state.counter, 32);
		boundReducers.decreaseCounter();
		assert.equal(state.counter, 31);
	});

	it('should bind an object of nested reducers functions to a state management interface', () => {
		let state = {
			name: '',
			count: {
				counter: 0,
			},
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState: any) {
				state = nextState;
			},
		};

		const reducers = {
			setName: (state: any, newName: any) =>
				_.assign({}, state, {
					name: newName,
				}),
			count: {
				increaseCounter: (state: any) =>
					_.assign({}, state, {
						counter: state.counter + 1,
					}),
				decreaseCounter: (state: any) =>
					_.assign({}, state, {
						counter: state.counter - 1,
					}),
				setCounter: (state: any, x: any) =>
					_.assign({}, state, {
						counter: x,
					}),
			},
		};

		const boundReducers: any = bindReducersToState(reducers, stateManager);

		assert.equal(state.name, '');
		assert.equal(state.count.counter, 0);

		boundReducers.setName('Neumann');
		assert.equal(state.name, 'Neumann');

		boundReducers.count.increaseCounter();
		assert.equal(state.count.counter, 1);

		boundReducers.count.setCounter(32);
		assert.equal(state.count.counter, 32);

		boundReducers.count.decreaseCounter();
		assert.equal(state.count.counter, 31);

		assert(
			_.isEqual(state, {
				name: 'Neumann',
				count: {
					counter: 31,
				},
			})
		);
	});
});

describe('#getStatefulPropsContext', () => {
	function isFunctions(objValue: any, othValue: any) {
		if (_.isFunction(objValue) && _.isFunction(othValue)) {
			return true;
		}
	}

	it('should return an object with two functions on it', () => {
		const statefulPropsContext = getStatefulPropsContext({}, {} as any);
		const getPropReplaceReducers = _.get(
			statefulPropsContext,
			'getPropReplaceReducers'
		);
		const getProps = _.get(statefulPropsContext, 'getProps');
		assert(_.isFunction(getPropReplaceReducers));
		assert(_.isFunction(getProps));
	});

	describe('statefulPropsContext', () => {
		let state: any;
		let stateManager: any;
		let reducers: any;
		let statefulPropsContext: any;

		beforeEach(() => {
			state = {
				name: '',
				count: {
					counter: 0,
				},
			};

			stateManager = {
				getState() {
					return state;
				},
				setState(nextState: any) {
					state = nextState;
				},
			};

			reducers = {
				setName: (state: any, newName: any) =>
					_.assign({}, state, {
						name: newName,
					}),
				count: {
					increaseCounter: (state: any) =>
						_.assign({}, state, {
							counter: state.counter + 1,
						}),
					decreaseCounter: (state: any) =>
						_.assign({}, state, {
							counter: state.counter - 1,
						}),
					setCounter: (state: any, x: any) =>
						_.assign({}, state, {
							counter: x,
						}),
				},
			};

			sinon.spy(reducers, 'setName');
			sinon.spy(reducers.count, 'increaseCounter');
			sinon.spy(reducers.count, 'decreaseCounter');
			sinon.spy(reducers.count, 'setCounter');

			statefulPropsContext = getStatefulPropsContext(reducers, stateManager);
		});

		describe('.getProps', () => {
			it('should return an object with reducers and current state merged', () => {
				const props = statefulPropsContext.getProps();
				assert(_.isEqualWith(props, _.merge({}, state, reducers), isFunctions));
			});

			it('should return an object with reducers and current state merged with prop arg overrides', () => {
				const overrides = {
					name: 'Neumann',
					dead: 0xbeef,
				};
				const props = statefulPropsContext.getProps(overrides);
				assert(
					_.isEqualWith(
						props,
						_.merge({}, state, reducers, overrides),
						isFunctions
					)
				);
			});

			it('should return an object with current state applied after function call modifies state', () => {
				const overrides = {
					name: 'Neumann',
				};
				let props;

				props = statefulPropsContext.getProps(overrides);
				assert.equal(props.count.counter, 0);

				props.count.increaseCounter();
				props = statefulPropsContext.getProps(overrides);
				assert.equal(props.count.counter, 1);

				props.count.setCounter(16);
				props = statefulPropsContext.getProps(overrides);
				assert.equal(props.count.counter, 16);

				props.count.decreaseCounter();
				props = statefulPropsContext.getProps(overrides);
				assert.equal(props.count.counter, 15);
			});

			it('should call override function after the same reducer function', () => {
				const overrides = {
					setName: sinon.spy(),
				};
				let props;

				props = statefulPropsContext.getProps(overrides);
				assert.equal(props.name, '');

				props.setName('Neumann');
				props = statefulPropsContext.getProps(overrides);

				assert.equal(props.name, 'Neumann');
				assert(reducers.setName.calledOnce);
				assert(overrides.setName.calledOnce);
				assert(reducers.setName.calledBefore(overrides.setName));
			});

			// Test written because of a perf issue related to cloning we ran into
			// with lodash@4.7.0 -- https://github.com/appnexus/lucid/issues/181
			it('should not clone arrays when the source object is undefined', () => {
				const overrides = {
					fresh: [{ a: 1 }],
				};
				const props = statefulPropsContext.getProps(overrides);

				assert(overrides.fresh[0] === props.fresh[0]);
			});
		});

		describe('.getPropReplaceReducers', () => {
			it('should return an object with reducers and current state merged', () => {
				const props = statefulPropsContext.getPropReplaceReducers();
				assert(_.isEqualWith(props, _.merge({}, state, reducers), isFunctions));
			});

			it('should return an object with reducers and current state merged with prop arg overrides', () => {
				const overrides = {
					name: 'Neumann',
					dead: 0xbeef,
				};
				const props = statefulPropsContext.getPropReplaceReducers(overrides);
				assert(
					_.isEqualWith(
						props,
						_.merge({}, state, reducers, overrides),
						isFunctions
					)
				);
			});

			it('should return an object with current state applied after function call modifies state', () => {
				const overrides = {
					name: 'Neumann',
				};
				let props;

				props = statefulPropsContext.getPropReplaceReducers(overrides);
				assert.equal(props.count.counter, 0);

				props.count.increaseCounter();
				props = statefulPropsContext.getPropReplaceReducers(overrides);
				assert.equal(props.count.counter, 1);

				props.count.setCounter(16);
				props = statefulPropsContext.getPropReplaceReducers(overrides);
				assert.equal(props.count.counter, 16);

				props.count.decreaseCounter();
				props = statefulPropsContext.getPropReplaceReducers(overrides);
				assert.equal(props.count.counter, 15);
			});

			it('should call override function instead of the reducer function', () => {
				const overrides = {
					setName: sinon.spy((state, name) =>
						_.assign({}, state, { name: _.toUpper(name) })
					),
				};
				let props;

				props = statefulPropsContext.getPropReplaceReducers(overrides);
				assert.equal(props.name, '');

				props.setName('Neumann');
				props = statefulPropsContext.getPropReplaceReducers(overrides);

				assert.equal(props.name, 'NEUMANN');
				assert(!reducers.setName.called);
				assert(overrides.setName.calledOnce);
			});
		});
	});
});

describe('#reduceSelectors', () => {
	const selectors = {
		fooAndBar: ({ foo, bar }: any) => `${foo} and ${bar}`,
		incrementedBaz: ({ baz }: any) => baz + 1,
		nested: {
			nestedFooAndBar: ({ foo, bar }: any) => `${foo} & ${bar}`,
			nestedIncrementedBaz: ({ baz }: any) => baz + 1,
			moreNested: {
				moreNestedFooAndBar: ({ foo, bar }: any) => `${foo} & ${bar}`,
			},
		},
	};

	const state = {
		foo: 'foo',
		bar: 'bar',
		baz: 0,
		nested: {
			foo: 'nestedFoo',
			bar: 'nestedBar',
			baz: 10,
			moreNested: {
				foo: 'foo',
				bar: 'bar',
			},
		},
	};

	const selector = reduceSelectors(selectors);

	it('should create a single selector function from selector tree', () => {
		const expected = {
			foo: 'foo',
			bar: 'bar',
			baz: 0,
			fooAndBar: 'foo and bar',
			incrementedBaz: 1,
			nested: {
				foo: 'nestedFoo',
				bar: 'nestedBar',
				baz: 10,
				nestedFooAndBar: 'nestedFoo & nestedBar',
				nestedIncrementedBaz: 11,
				moreNested: {
					foo: 'foo',
					bar: 'bar',
					moreNestedFooAndBar: 'foo & bar',
				},
			},
		};
		assert.deepEqual(selector(state), expected, 'must be deeply equal');
	});

	it('should maintain referential equality if source does', () => {
		assert.equal(selector(state), selector(state));
	});

	it('should maintain referential equality of branches if source does', () => {
		assert.equal(
			selector(state).nested,
			selector({ ...state, foo: 'bar', bar: 'foo' }).nested
		);
		assert.equal(
			selector(state).nested.moreNested,
			selector({
				...state,
				nested: {
					...state.nested,
					foo: 'bar',
					bar: 'foo',
				},
			}).nested.moreNested
		);
	});

	it('should throw if the selector is not an object', () => {
		expect(() => {
			reduceSelectors(['foo']);
		}).toThrow();
	});

	it('should not throw if the selector is a babel esModule', () => {
		/*
			babel no longer creates plain javascript objects when transpiling imports
			like `import * as foo from 'someSelectorFile';`. What babel imports has a
			prototype and a defined `__esModule` property.

			A common pattern used by consumers is to create a module of selector pure functions,
			import them all, and directly pass those selectors to the stateful component.
		 */

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		function mockBabelModule() {}
		mockBabelModule.prototype.foo = 'bar';

		// @ts-ignore
		const someModule: any = new mockBabelModule();
		someModule.someSelector = () => {};

		Object.defineProperty(someModule, '__esModule', {
			value: true,
			enumerable: false,
			writable: false,
		});

		expect(() => {
			reduceSelectors(someModule);
		}).not.toThrow();
	});
});

describe('#safeMerge', () => {
	it('should not merge arrays', () => {
		const objValue = ['foo'];
		const srcValue = ['bar'];
		const value = safeMerge(objValue, srcValue);
		assert.deepEqual(value, srcValue, 'must be ["bar"]');
	});
	it('should return valid react elements', () => {
		const srcValue = <div>foo</div>;
		const value = safeMerge({}, srcValue);
		assert.equal(value, srcValue, 'must be srcValue');
	});
	it('should return arrays that contain react elements', () => {
		const srcValue = [<div key='1'>foo</div>];
		const value = safeMerge({}, srcValue);
		assert.equal(value, srcValue, 'must be srcValue');
	});
	it('should return srcValue array if objValue is undefined', () => {
		const srcValue: any = [];
		const value = safeMerge(undefined, srcValue);
		assert.equal(value, srcValue, 'must be srcValue');
	});
});

describe('#buildHybridComponent', () => {
	const CounterDumb = createClass({
		displayName: 'Counter',
		propTypes: {
			count: PropTypes.number,
			onIncrement: PropTypes.func,
			onDecrement: PropTypes.func,
			countDisplay: PropTypes.string,
			countModThree: PropTypes.number,
		} as any,
		getDefaultProps() {
			return {
				count: 0,
			} as any;
		},
		reducers: {
			onIncrement(state: any) {
				return _.assign({}, state, { count: state.count + 1 }) as any;
			},
			onDecrement(state: any) {
				return _.assign({}, state, { count: state.count - 1 });
			},
		} as any,
		selectors: {
			countDisplay: (state: any) => `count: ${state.count}`,
			countModThree: (state: any) => state.count % 3,
		},
		render() {
			const { count, countDisplay, countModThree, onIncrement, onDecrement } =
				this.props as any;

			return (
				<section>
					<button className='minus' onClick={onDecrement}>
						-
					</button>
					<span className='count'>{count}</span>
					<span className='count-display'>{countDisplay}</span>
					<span className='count-mod-three'>{countModThree}</span>
					<button className='plus' onClick={onIncrement}>
						+
					</button>
				</section>
			);
		},
	});

	it('should generate a stateful component from stateless component + reducers', () => {
		const StatefulCounter = buildHybridComponent(CounterDumb);
		const wrapper = mount(<StatefulCounter />);

		const minusButton = wrapper.find('button.minus');
		const countSpan = wrapper.find('.count');
		const countDisplaySpan = wrapper.find('.count-display');
		const countModThreeSpan = wrapper.find('.count-mod-three');
		const plusButton = wrapper.find('button.plus');

		assert.equal(countSpan.text(), '0');
		assert.equal(countDisplaySpan.text(), 'count: 0');
		assert.equal(countModThreeSpan.text(), '0');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '1');
		assert.equal(countDisplaySpan.text(), 'count: 1');
		assert.equal(countModThreeSpan.text(), '1');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '2');
		assert.equal(countDisplaySpan.text(), 'count: 2');
		assert.equal(countModThreeSpan.text(), '2');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '3');
		assert.equal(countDisplaySpan.text(), 'count: 3');
		assert.equal(countModThreeSpan.text(), '0');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '2');
		assert.equal(countDisplaySpan.text(), 'count: 2');
		assert.equal(countModThreeSpan.text(), '2');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '1');
		assert.equal(countDisplaySpan.text(), 'count: 1');
		assert.equal(countModThreeSpan.text(), '1');
	});

	describe('wrapped component', () => {
		/* eslint-disable no-console */
		let warn: any;

		beforeEach(() => {
			warn = console.warn;
			console.warn = jest.fn();
		});

		it('should not wrap a wrapped component', () => {
			const StatefulCounter = buildHybridComponent(CounterDumb);
			assert.equal(StatefulCounter, buildHybridComponent(StatefulCounter));
			expect(console.warn).toHaveBeenCalledWith(
				'Lucid: you are trying to apply buildHybridComponent to Counter, which is already a hybrid component. Lucid exports hybrid components by default. To access the dumb components, use the -Dumb suffix, e.g. "ComponentDumb"'
			);
		});

		afterEach(() => {
			console.warn = warn;
		});
		/* eslint-enable no-console */
	});

	it('should prioritize passed-in prop values over internal state', () => {
		const StatefulCounter = buildHybridComponent(CounterDumb);
		const wrapper = mount(<StatefulCounter count={36} />);

		const minusButton = wrapper.find('button.minus');
		const countSpan = wrapper.find('.count');
		const plusButton = wrapper.find('button.plus');

		assert.equal(countSpan.text(), '36');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '36');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '36');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '36');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '36');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '36');
	});

	it('should override initial default state with data from the `initialState` prop', () => {
		const StatefulCounter = buildHybridComponent(CounterDumb);
		const wrapper = mount(<StatefulCounter initialState={{ count: 36 }} />);

		const minusButton = wrapper.find('button.minus');
		const countSpan = wrapper.find('.count');
		const plusButton = wrapper.find('button.plus');

		assert.equal(countSpan.text(), '36');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '37');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '38');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '39');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '38');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '37');
	});

	it('should call functions passed in thru props with same name as invoked reducers', () => {
		const onIncrement = sinon.spy();
		const onDecrement = sinon.spy();
		const StatefulCounter = buildHybridComponent(CounterDumb);
		const wrapper = mount(
			<StatefulCounter onIncrement={onIncrement} onDecrement={onDecrement} />
		);

		const minusButton = wrapper.find('button.minus');
		const countSpan = wrapper.find('.count');
		const plusButton = wrapper.find('button.plus');

		assert(!onIncrement.called);
		assert(!onDecrement.called);
		assert.equal(countSpan.text(), '0');

		plusButton.simulate('click');
		assert(onIncrement.calledOnce);
		assert(!onDecrement.called);
		assert.equal(countSpan.text(), '1');

		minusButton.simulate('click');
		assert(onIncrement.calledOnce);
		assert(onDecrement.calledOnce);
		assert.equal(countSpan.text(), '0');

		plusButton.simulate('click');
		assert(onIncrement.calledTwice);
		assert(onDecrement.calledOnce);
		assert.equal(countSpan.text(), '1');
	});

	it('should allow the consumer to override reducers', () => {
		const onIncrement = sinon.spy();
		const onDecrement = sinon.spy();
		const StatefulCounter = buildHybridComponent(CounterDumb, {
			reducers: { onIncrement, onDecrement },
		});
		const wrapper = mount(<StatefulCounter />);

		const minusButton = wrapper.find('button.minus');
		const plusButton = wrapper.find('button.plus');

		assert(!onIncrement.called);
		assert(!onDecrement.called);

		plusButton.simulate('click');
		assert(onIncrement.calledOnce);
		assert(!onDecrement.called);

		minusButton.simulate('click');
		assert(onIncrement.calledOnce);
		assert(onDecrement.calledOnce);
	});
});
