import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';

import RadioButton from './RadioButton';

describe('RadioButton', () => {
	common(RadioButton);
	controls(RadioButton, {
		callbackName: 'onSelect',
		controlSelector: '.lucid-RadioButton-native',
		eventType: 'click',
	});

	const booleanValues = [true, false];

	describe('props', () => {
		describe('isDisabled', () => {
			it('sets the `disabled` attribute of the native radio button element.', () => {
				_.forEach(booleanValues, testValue => {
					const wrapper = shallow(<RadioButton isDisabled={testValue} />);

					assert.equal(
						wrapper.find('input[type="radio"]').prop('disabled'),
						testValue
					);
				});
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<RadioButton />);

				assert.equal(wrapper.prop('isDisabled'), false);
			});
		});

		describe('isSelected', () => {
			it('sets the `checked` attribute of the native radio button element.', () => {
				_.forEach(booleanValues, testValue => {
					const wrapper = shallow(<RadioButton isSelected={testValue} />);

					assert.equal(
						wrapper.find('input[type="radio"]').prop('checked'),
						testValue
					);
				});
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<RadioButton />);

				assert.equal(wrapper.prop('isSelected'), false);
			});
		});

		describe('onSelect', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<RadioButton />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the native input.', () => {
				const wrapper = mount(
					<RadioButton
						className="wut"
						isDisabled={true}
						isSelected={true}
						style={{ fontWeight: 'bold' }}
						onSelect={_.noop}
						foo={1}
						bar={2}
						baz={3}
						qux={4}
						quux={5}
					/>
				);
				const nativeProps = wrapper.find('input[type="radio"]').props();

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the native input.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], prop => {
					assert(_.has(nativeProps, prop));
				});
			});
		});
	});
});

describe('RadioButton', () => {
	function simulateEvent(reactElement, selector, event) {
		mount(reactElement).find(selector).simulate(event);
	}

	function verifyArguments(event) {
		_.forEach(
			[
				'',
				'-native',
				'-visualization-container',
				'-visualization-glow',
				'-visualization-dot',
			],
			classSubString => {
				const onSelect = sinon.spy();

				simulateEvent(
					<RadioButton isSelected={false} onSelect={onSelect} />,
					`.lucid-RadioButton${classSubString}`,
					event
				);
				assert.equal(onSelect.args[0][0], true);
				assert(_.last(onSelect.args[0]).event);
			}
		);
	}

	function verifyNoOnSelect(event) {
		_.forEach(
			[
				'',
				'-native',
				'-visualization-container',
				'-visualization-glow',
				'-visualization-dot',
			],
			classSubString => {
				const onSelect = sinon.spy();

				simulateEvent(
					<RadioButton isSelected={true} onSelect={onSelect} />,
					`.lucid-RadioButton${classSubString}`,
					event
				);
				assert.equal(onSelect.calledOnce, false);
			}
		);
	}

	function verifyOnSelect(event) {
		_.forEach(
			[
				'',
				'-native',
				'-visualization-container',
				'-visualization-glow',
				'-visualization-dot',
			],
			classSubString => {
				const onSelect = sinon.spy();

				simulateEvent(
					<RadioButton isSelected={false} onSelect={onSelect} />,
					`.lucid-RadioButton${classSubString}`,
					event
				);
				assert(onSelect.calledOnce);
			}
		);
	}

	describe('user clicks on the rendered control', () => {
		it('calls the function passed in as the `onSelect` prop if `isSelected` is false...', () => {
			verifyOnSelect('click');
		});

		it('...and passes along true as the first argument and a React synthetic event as the second argument.', () => {
			verifyArguments('click');
		});

		it('does not call the function passed in as the `onSelect` prop if `isSelected` is true.', () => {
			verifyNoOnSelect('click');
		});
	});
});
