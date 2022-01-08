import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import RadioButton from './RadioButton';

const args = RadioButton.defaultProps;

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
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(
						<RadioButton {...args} isDisabled={testValue} />
					);

					assert.equal(
						wrapper.find('input[type="radio"]').prop('disabled'),
						testValue
					);
				});
			});
		});

		describe('isSelected', () => {
			it('sets the `checked` attribute of the native radio button element.', () => {
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(
						<RadioButton {...args} isSelected={testValue} />
					);

					assert.equal(
						wrapper.find('input[type="radio"]').prop('checked'),
						testValue
					);
				});
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the native input.', () => {
				const wrapper = mount(
					<RadioButton
						{...args}
						className='wut'
						isDisabled={true}
						isSelected={true}
						style={{ fontWeight: 'bold' }}
						onSelect={_.noop}
						{...{
							foo: 1,
							bar: 2,
							baz: 3,
							qux: 4,
							quux: 5,
						}}
					/>
				);
				const nativeProps = wrapper.find('input[type="radio"]').props();

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the native input.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.has(nativeProps, prop));
				});
			});
		});
	});
});

describe('RadioButton', () => {
	function simulateEvent(reactElement: any, selector: any, event: any) {
		mount(reactElement).find(selector).simulate(event);
	}

	function verifyArguments(event: any) {
		_.forEach(
			[
				'',
				'-native',
				'-visualization-container',
				'-visualization-glow',
				'-visualization-dot',
			],
			(classSubString) => {
				const onSelect: any = sinon.spy();

				simulateEvent(
					<RadioButton {...args} isSelected={false} onSelect={onSelect} />,
					`.lucid-RadioButton${classSubString}`,
					event
				);
				assert.equal(onSelect.args[0][0], true);
				assert((_.last(onSelect.args[0]) as any).event);
			}
		);
	}

	function verifyNoOnSelect(event: any) {
		_.forEach(
			[
				'',
				'-native',
				'-visualization-container',
				'-visualization-glow',
				'-visualization-dot',
			],
			(classSubString) => {
				const onSelect: any = sinon.spy();

				simulateEvent(
					<RadioButton {...args} isSelected={true} onSelect={onSelect} />,
					`.lucid-RadioButton${classSubString}`,
					event
				);
				assert.equal(onSelect.calledOnce, false);
			}
		);
	}

	function verifyOnSelect(event: any) {
		_.forEach(
			[
				'',
				'-native',
				'-visualization-container',
				'-visualization-glow',
				'-visualization-dot',
			],
			(classSubString) => {
				const onSelect: any = sinon.spy();

				simulateEvent(
					<RadioButton {...args} isSelected={false} onSelect={onSelect} />,
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
