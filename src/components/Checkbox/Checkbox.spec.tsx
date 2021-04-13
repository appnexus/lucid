import React from 'react';
import { common, controls } from '../../util/generic-tests';
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import _ from 'lodash';
import sinon from 'sinon';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
	common(Checkbox);
	controls(Checkbox, {
		callbackName: 'onSelect',
		controlSelector: '.lucid-Checkbox-native',
		eventType: 'click',
	});

	describe('props', () => {
		describe('isDisabled', () => {
			it('should set `disabled` attribute to true', () => {
				const trueWrapper = mount(<Checkbox isDisabled={true} />);
				assert.equal(
					trueWrapper.find('.lucid-Checkbox-native').prop('disabled'),
					true
				);
			});

			it('should set `disabled` attribute to false', () => {
				const falseWrapper = mount(<Checkbox isDisabled={false} />);
				assert.equal(
					falseWrapper.find('.lucid-Checkbox-native').prop('disabled'),
					false
				);
			});
		});

		describe('isSelected', () => {
			it('should set `checked` attribute to true', () => {
				const trueWrapper = mount(<Checkbox isSelected={true} />);
				assert.equal(
					trueWrapper.find('.lucid-Checkbox-native').prop('checked'),
					true
				);
			});

			it('should set `checked` attribute to false', () => {
				const falseWrapper = mount(<Checkbox isSelected={false} />);
				assert.equal(
					falseWrapper.find('.lucid-Checkbox-native').prop('checked'),
					false
				);
			});
		});

		describe('isIndeterminate', () => {
			it('should set the top-level classname `&-is-selected`', () => {
				const wrapper = shallow(<Checkbox isIndeterminate />);
				assert(wrapper.hasClass('lucid-Checkbox-is-selected'));
			});

			it('should not contain a `span.&-visualization-checkmark`', () => {
				const wrapper = shallow(<Checkbox isIndeterminate />);
				assert.equal(
					wrapper.find('span.lucid-Checkbox-visualization-checkmark').length,
					0
				);
			});

			it('should contain a `span.&-visualization-indeterminate`', () => {
				const wrapper = shallow(<Checkbox isIndeterminate />);
				assert.equal(
					wrapper.find('span.lucid-Checkbox-visualization-indeterminate')
						.length,
					1
				);
			});

			it('should contain a `span.&-visualization-indeterminate-line`', () => {
				const wrapper = shallow(<Checkbox isIndeterminate />);
				assert.equal(
					wrapper.find('span.lucid-Checkbox-visualization-indeterminate-line')
						.length,
					1
				);
			});
		});
	});

	describe('pass throughs', () => {
		it('passes through all props not defined in `propTypes` to the native input', () => {
			const wrapper = mount(
				<Checkbox
					className='mert'
					isDisabled={false}
					isSelected={false}
					checked={true}
					style={{ color: 'purple' }}
					onSelect={_.noop}
					{...{
						foo: 1,
						bar: 2,
						baz: 3,
						qux: 4,
					}}
				/>
			);

			const nativeWrapper = wrapper.find('.lucid-Checkbox-native');

			assert.equal(nativeWrapper.prop('foo'), 1);
			assert.equal(nativeWrapper.prop('bar'), 2);
			assert.equal(nativeWrapper.prop('baz'), 3);
			assert.equal(nativeWrapper.prop('qux'), 4);
			assert.equal(nativeWrapper.prop('checked'), false); // `checked` should not pass through
		});
	});

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
});

function simulateEvent(reactElement: any, selector: any, event: any) {
	mount(reactElement).find(selector).simulate(event);
}

function verifyArgumentsWhenFalse(event: any) {
	_.forEach(
		[
			'',
			'-native',
			'-visualization-container',
			'-visualization-glow',
			'-visualization-checkmark',
		],
		(classSubString) => {
			const onSelect: any = sinon.spy();

			simulateEvent(
				<Checkbox isSelected={false} onSelect={onSelect} />,
				`.lucid-Checkbox${classSubString}`,
				event
			);
			assert.equal(onSelect.args[0][0], true);
			assert((_.last(onSelect.args[0]) as any).event);
		}
	);
}

function verifyArgumentsWhenTrue(event: any) {
	_.forEach(
		[
			'',
			'-native',
			'-visualization-container',
			'-visualization-glow',
			'-visualization-checkmark',
		],
		(classSubString) => {
			const onSelect: any = sinon.spy();

			simulateEvent(
				<Checkbox isSelected={true} onSelect={onSelect} />,
				`.lucid-Checkbox${classSubString}`,
				event
			);
			assert.equal(onSelect.args[0][0], false);
			assert((_.last(onSelect.args[0]) as any).event);
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
			'-visualization-checkmark',
		],
		(classSubString) => {
			const onSelect: any = sinon.spy();

			simulateEvent(
				<Checkbox onSelect={onSelect} />,
				`.lucid-Checkbox${classSubString}`,
				event
			);
			assert(onSelect.calledOnce);
		}
	);
}
