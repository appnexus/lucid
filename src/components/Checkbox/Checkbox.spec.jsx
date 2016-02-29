import React from 'react';
import { common } from '../../util/generic-tests';
import { shallow, mount } from 'enzyme';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import assert from 'assert';
import _ from 'lodash';
import sinon from 'sinon';

import describeWithDOM from '../../util/describe-with-dom';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
	common(Checkbox);

	describe('props', () => {
		it('`isDisabled` sets the `disabled` attribute of the native checkbox element', () => {
			const trueWrapper = shallow(<Checkbox isDisabled={true} />);
			const falseWrapper = shallow(<Checkbox isDisabled={false} />);

			assert.equal(trueWrapper.find('input[type="checkbox"]').prop('disabled'), true);
			assert.equal(falseWrapper.find('input[type="checkbox"]').prop('disabled'), false);
		});

		it('`isSelected` sets the `checked` attribute of the native check box element', () => {
			const trueWrapper = shallow(<Checkbox isSelected={true} />);
			const falseWrapper = shallow(<Checkbox isSelected={false} />);

			assert.equal(trueWrapper.find('input[type="checkbox"]').prop('checked'), true);
			assert.equal(falseWrapper.find('input[type="checkbox"]').prop('checked'), false);
		});

	});
});

describeWithDOM('Checkbox', () => {
	function simulateEvent(reactElement, selector, event) {
		mount(reactElement).find(selector).simulate(event);
	}

	function verifyArgumentsWhenFalse(event) {
		_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-checkmark'], (classSubString) => {
			const onSelect = sinon.spy();

			simulateEvent(<Checkbox isSelected={false} onSelect={onSelect} />, `.lucid-Checkbox${classSubString}`, event);
			assert.equal(onSelect.args[0][0], true);
			assert(onSelect.args[0][1] instanceof SyntheticEvent);
		});
	}

	function verifyArgumentsWhenTrue(event) {
		_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-checkmark'], (classSubString) => {
			const onSelect = sinon.spy();

			simulateEvent(<Checkbox isSelected={true} onSelect={onSelect} />, `.lucid-Checkbox${classSubString}`, event);
			assert.equal(onSelect.args[0][0], false);
			assert(onSelect.args[0][1] instanceof SyntheticEvent);
		});
	}

	function verifyOnSelect(event) {
		_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-checkmark'], (classSubString) => {
			const onSelect = sinon.spy();

			simulateEvent(<Checkbox onSelect={onSelect} />, `.lucid-Checkbox${classSubString}`, event);
			assert(onSelect.calledOnce);
		});
	}

	describe('props', () => {
		it('`isDisabled` defaults to `false`', () => {
			const wrapper = mount(<Checkbox />);

			assert.equal(wrapper.prop('isDisabled'), false);
		});

		it('`isSelected` defaults to `false`', () => {
			const wrapper = mount(<Checkbox />);

			assert.equal(wrapper.prop('isSelected'), false);
		});

		it('`onSelect` defaults to the Lodash `noop` method', () => {
			const wrapper = mount(<Checkbox />);

			assert.equal(wrapper.prop('onSelect'), _.noop);
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
					foo={1}
					bar={2}
					baz={3}
					qux={4}
				/>
			);

			const nativeWrapper = wrapper.find('input[type="checkbox"]');

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

