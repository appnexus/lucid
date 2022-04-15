import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import Switch from './Switch';

describe('Switch', () => {
	common(Switch);
	controls(Switch, {
		callbackName: 'onSelect',
		controlSelector: '.lucid-Switch-native',
		eventType: 'click',
	});

	const booleanValues = [true, false];

	describe('props', () => {
		describe('isDisabled', () => {
			it('sets the `disabled` attribute of the native check box element.', () => {
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(<Switch isDisabled={testValue} />);

					assert.equal(
						wrapper.find('input[type="checkbox"]').prop('disabled'),
						testValue
					);
				});
			});
		});

		describe('isSelected', () => {
			it('sets the `checked` attribute of the native check box element.', () => {
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(<Switch isSelected={testValue} />);

					assert.equal(
						wrapper.find('input[type="checkbox"]').prop('checked'),
						testValue
					);
				});
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const className = 'wut';

			beforeEach(() => {
				const defaultProps = Switch.defaultProps;

				const props = {
					...defaultProps,
					isDisabled: true,
					isSelected: true,
					style: { fontWeight: 'bold' },
					onSelect: noop,
					isIncludeExclude: true,
					className,
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
					...{
						foo: 1,
						bar: 2,
						baz: 3,
						qux: 4,
						quux: 5,
					},
				};

				wrapper = shallow(<Switch {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through all props not defined in `propTypes` to the native input element.', () => {
				const inputProps = wrapper.find('.lucid-Switch-native').props();

				// 'className', 'onChange', 'checked', 'disabled' and 'type'
				// all appear becuase they are directly passed on the root element as a prop
				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the native input.
				_.forEach(
					[
						'foo',
						'bar',
						'baz',
						'qux',
						'quux',
						'onChange',
						'checked',
						'disabled',
						'type',
						'className',
						'data-testid',
					],
					(prop) => {
						expect(has(inputProps, prop)).toBe(true);
					}
				);
			});
			it('omits the component specific props defined in `propTypes` (plus, in addition, `children`, `initialState`, and `callbackId`) from the root element', () => {
				const inputProps = wrapper.find('.lucid-Switch-native').props();

				forEach(
					[
						'isDisabled',
						'isSelected',
						'onSelect',
						'style',
						'isIncludeExclude',
						'initialState',
						'callbackId',
						'children',
					],
					(prop) => {
						expect(has(inputProps, prop)).toBe(false);
					}
				);
			});
		});
	});
});

describe('Switch', () => {
	function simulateEvent(reactElement: any, selector: any, event: any) {
		mount(reactElement).find(selector).simulate(event);
	}

	function verifyArgumentsWhenFalse(event: any) {
		_.forEach(
			['', '-native', '-visualization-container', '-visualization-handle'],
			(classSubString) => {
				const onSelect: any = sinon.spy();

				simulateEvent(
					<Switch isSelected={false} onSelect={onSelect} />,
					`.lucid-Switch${classSubString}`,
					event
				);
				assert.equal(onSelect.args[0][0], true);
				assert((_.last(onSelect.args[0]) as any).event);
			}
		);
	}

	function verifyArgumentsWhenTrue(event: any) {
		_.forEach(
			['', '-native', '-visualization-container', '-visualization-handle'],
			(classSubString) => {
				const onSelect: any = sinon.spy();

				simulateEvent(
					<Switch isSelected={true} onSelect={onSelect} />,
					`.lucid-Switch${classSubString}`,
					event
				);
				assert.equal(onSelect.args[0][0], false);
				assert((_.last(onSelect.args[0]) as any).event);
			}
		);
	}

	function verifyOnSelect(event: any) {
		_.forEach(
			['', '-native', '-visualization-container', '-visualization-handle'],
			(classSubString) => {
				const onSelect: any = sinon.spy();

				simulateEvent(
					<Switch onSelect={onSelect} />,
					`.lucid-Switch${classSubString}`,
					event
				);
				assert(onSelect.calledOnce);
			}
		);
	}

	describe('user clicks on the rendered control', () => {
		it('calls the function passed in as the `onSelect` prop...', () => {
			verifyOnSelect('click');
		});

		it('...and when `isSelected` is true passes along false as the first argument and a React synthetic event as the second argument.', () => {
			verifyArgumentsWhenTrue('click');
		});

		it('...and when `isSelected` is false passes along true as the first argument and a React synthetic event as the second argument.', () => {
			verifyArgumentsWhenFalse('click');
		});
	});

	describe('user taps on the rendered control', () => {
		it('calls the function passed in as the `onSelect` prop...', () => {
			verifyOnSelect('touchend');
		});

		it('...and when `isSelected` is true passes along false as the first argument and a React synthetic event as the second argument.', () => {
			verifyArgumentsWhenTrue('touchend');
		});

		it('...and when `isSelected` is false passes along true as the first argument and a React synthetic event as the second argument.', () => {
			verifyArgumentsWhenFalse('touchend');
		});
	});
});
