import assert from 'assert';
import _ from 'lodash';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import describeWithDOM from './describe-with-dom';

import {
	getDeepPaths,
	omitFunctionPropsDeep,
	bindReducerToState,
	bindReducersToState,
	getStatefulPropsContext,
	buildHybridComponent
} from './state-management';

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
					options: [5, 10, 20]
				}
			}
		};

		const deepPaths = getDeepPaths(pagedTableObj);
		const xorPaths = _.xorWith(deepPaths, [
			['rows'],
			['paginator', 'selectedPageIndex'],
			['paginator', 'selectedPageSize'],
			['paginator', 'dropselector', 'selectedIndex'],
			['paginator', 'dropselector', 'options']
		], _.isEqual)
		assert(_.isEqual([], xorPaths))
	});

	it('should return an array of paths for each node with non-plain object value if arg is array', () => {
		const deepPaths = getDeepPaths(['zero', { one: 1 }, 2]);
		const xorPaths = _.xorWith(deepPaths, [
			[0],
			[1, 'one'],
			[2]
		], _.isEqual)
		assert(_.isEqual([], xorPaths))
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
					onSelect: _.noop
				}
			}
		};

		const result = omitFunctionPropsDeep(pagedTableObj);

		assert(_.isEqual(result, {
			rows: ['data0', 'data1'],
			paginator: {
				selectedPageIndex: 0,
				selectedPageSize: 10,
				dropselector: {
					selectedIndex: 1,
					options: [5, 10, 20]
				}
			}
		}));
	});
});

describe('#bindReducerToState', () => {
	it('should bind a single reducer function to a state management interface', () => {
		let state = {
			value: null
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState) {
				state = nextState;
			}
		};

		function setValue(state, value) {
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
				value: null
			}
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState) {
				state = nextState;
			}
		};

		function setValue(state, value) {
			return _.assign({}, state, { value });
		}

		const boundSetValue = bindReducerToState(setValue, stateManager, ['sub', 'setValue']);

		assert.equal(state.sub.value, null);
		boundSetValue('foo');
		assert.equal(state.sub.value, 'foo');
	});
});

describe('#bindReducersToState', () => {
	it('should bind an object of reducers functions to a state management interface', () => {
		let state = {
			counter: 0
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState) {
				state = nextState;
			}
		};

		const reducers = {
			increaseCounter: (state) => _.assign({}, state, {
				counter: state.counter + 1
			}),
			decreaseCounter: (state) => _.assign({}, state, {
				counter: state.counter - 1
			}),
			setCounter: (state, x) => _.assign({}, state, {
				counter: x
			})
		};


		const boundReducers = bindReducersToState(reducers, stateManager);

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
				counter: 0
			}
		};

		const stateManager = {
			getState() {
				return state;
			},
			setState(nextState) {
				state = nextState;
			}
		};

		const reducers = {
			setName: (state, newName) => _.assign({}, state, {
				name: newName
			}),
			count: {
				increaseCounter: (state) => _.assign({}, state, {
					counter: state.counter + 1
				}),
				decreaseCounter: (state) => _.assign({}, state, {
					counter: state.counter - 1
				}),
				setCounter: (state, x) => _.assign({}, state, {
					counter: x
				})
			}
		};


		const boundReducers = bindReducersToState(reducers, stateManager);

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

		assert(_.isEqual(state, {
			name: 'Neumann',
			count: {
				counter: 31
			}
		}));
	});
});

describe('#getStatefulPropsContext', () => {
	function isFunctions(objValue, othValue) {
		if (_.isFunction(objValue) && _.isFunction(othValue)) {
			return true;
		}
	}

	it('should return an object with two functions on it', () => {
		const statefulPropsContext = getStatefulPropsContext({}, {});
		const getPropReplaceReducers = _.get(statefulPropsContext, 'getPropReplaceReducers');
		const getProps = _.get(statefulPropsContext, 'getProps');
		assert(_.isFunction(getPropReplaceReducers));
		assert(_.isFunction(getProps));
	});

	describe('statefulPropsContext', () => {
		let state;
		let stateManager;
		let reducers;
		let statefulPropsContext;

		beforeEach(() => {
			state = {
				name: '',
				count: {
					counter: 0
				}
			};

			stateManager = {
				getState() {
					return state;
				},
				setState(nextState) {
					state = nextState;
				}
			};

			reducers = {
				setName: (state, newName) => _.assign({}, state, {
					name: newName
				}),
				count: {
					increaseCounter: (state) => _.assign({}, state, {
						counter: state.counter + 1
					}),
					decreaseCounter: (state) => _.assign({}, state, {
						counter: state.counter - 1
					}),
					setCounter: (state, x) => _.assign({}, state, {
						counter: x
					})
				}
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
					dead: 0xbeef
				};
				const props = statefulPropsContext.getProps(overrides);
				assert(_.isEqualWith(props, _.merge({}, state, reducers, overrides), isFunctions));
			});

			it('should return an object with current state applied after function call modifies state', () => {
				const overrides = {
					name: 'Neumann'
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
					setName: sinon.spy()
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
					fresh: [{a: 1}]
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
					dead: 0xbeef
				};
				const props = statefulPropsContext.getPropReplaceReducers(overrides);
				assert(_.isEqualWith(props, _.merge({}, state, reducers, overrides), isFunctions));
			});

			it('should return an object with current state applied after function call modifies state', () => {
				const overrides = {
					name: 'Neumann'
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
					setName: sinon.spy((state, name) => _.assign({}, state, { name: _.toUpper(name) }))
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

describeWithDOM('#buildHybridComponent', () => {
	const Counter = React.createClass({
		displayName: 'Counter',
		propTypes: {
			count: React.PropTypes.number,
			onIncrement: React.PropTypes.func,
			onDecrement: React.PropTypes.func
		},
		getDefaultProps() {
			return {
				count: 0
			};
		},
		statics: {
			reducers: {
				onIncrement(state) {
					return _.assign({}, state, { count: state.count + 1 })
				},
				onDecrement(state) {
					return _.assign({}, state, { count: state.count - 1 })
				}
			}
		},
		render() {
			const {
				count,
				onIncrement,
				onDecrement
			} = this.props;

			return (
				<section>
					<button className='minus' onClick={onDecrement}>-</button>
					<span className='count'>{count}</span>
					<button className='plus' onClick={onIncrement}>+</button>
				</section>
			);
		}
	});

	it('should generate a stateful component from stateless component + reducers', () => {
		const StatefulCounter = buildHybridComponent(Counter);
		const wrapper = mount(<StatefulCounter />);

		let minusButton = wrapper.find('button.minus');
		let countSpan = wrapper.find('.count');
		let plusButton = wrapper.find('button.plus');

		assert.equal(countSpan.text(), '0');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '1');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '2');

		plusButton.simulate('click');
		assert.equal(countSpan.text(), '3');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '2');

		minusButton.simulate('click');
		assert.equal(countSpan.text(), '1');
	});

	it('should not wrap a wrapped component', () => {
		const StatefulCounter = buildHybridComponent(Counter);
		assert.equal(StatefulCounter, buildHybridComponent(StatefulCounter));
	});

	it('should prioritize passed-in prop values over internal state', () => {
		const StatefulCounter = buildHybridComponent(Counter);
		const wrapper = mount(<StatefulCounter count={36} />);

		let minusButton = wrapper.find('button.minus');
		let countSpan = wrapper.find('.count');
		let plusButton = wrapper.find('button.plus');

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

	it('should call functions passed in thru props with same name as invoked reducers', () => {
		const onIncrement = sinon.spy();
		const onDecrement = sinon.spy();
		const StatefulCounter = buildHybridComponent(Counter);
		const wrapper = mount(<StatefulCounter onIncrement={onIncrement} onDecrement={onDecrement} />);

		let minusButton = wrapper.find('button.minus');
		let countSpan = wrapper.find('.count');
		let plusButton = wrapper.find('button.plus');

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
});
