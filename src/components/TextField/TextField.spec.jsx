import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { common, controls } from '../../util/generic-tests';
import assert from 'assert';
import TextField from './TextField';

describe('TextField', () => {
	common(TextField);
	controls(TextField, {
		callbackName: 'onChange',
		controlSelector: '.lucid-TextField',
		eventType: 'change',
	});

	it('should correctly debounce onChangeDebounced', (done) => {
		const onChangeDebounced = sinon.spy();
		const wrapper = shallow(
			<TextField onChangeDebounced={onChangeDebounced} debounceLevel={0} />
		);

		wrapper.find('input').simulate('change', { target: { value: 'yolo' } });

		assert(onChangeDebounced.notCalled);

		setTimeout(() => {
			assert(onChangeDebounced.called);
			assert.equal(onChangeDebounced.args[0][0], 'yolo');
			done();
		}, 5);
	});

	it('should accept a new `value` prop immediately if the user hasnt typed anything recently', () => {
		const wrapper = shallow(
			<TextField value='start' />
		);

		wrapper.setProps({ value: 'end' });

		assert.equal(wrapper.state('value'), 'end');
	});

	it('should postpone state changes if the user recently typed something in', (done) => {
		const wrapper = shallow(
			<TextField value='start' lazyLevel={1} />
		);

		// Order of operations is crucial for this test
		// 1) User starts typing something in
		// 2) New props comes in from above while the user is typing
		// 3) The props shouldn't take effect until the lazyLevel has elapsed
		assert.equal(wrapper.state('value'), 'start');

		wrapper.find('input').simulate('change', { target: { value: 'user typed' } });

		wrapper.setProps({ value: 'end' });

		assert.equal(wrapper.state('value'), 'user typed');

		setTimeout(() => {
			assert.equal(wrapper.state('value'), 'end');
			done();
		}, 5);
	});

	it('should callback onSubmit when the user hits enter', () => {
		const onSubmit = sinon.spy();
		const wrapper = shallow(
			<TextField onSubmit={onSubmit} />
		);

		wrapper.find('input').simulate('keydown', {
			keyCode: 0x0D,
			target: {
				value: 'yolo'
			}
		});

		assert(onSubmit.called);
		assert.equal(onSubmit.args[0][0], 'yolo');
	});

	it('should respect isDisabled', () => {
		const wrapper = shallow(
			<TextField isDisabled={true} />
		);

		assert.equal(wrapper.find('input').prop('disabled'), true);
	});

	it('should respect isMultiLine', () => {
		const wrapper = shallow(
			<TextField isMultiLine={true} />
		);

		assert.equal(wrapper.find('textarea').length, 1);
		assert.equal(wrapper.find('.lucid-TextField-is-multi-line').length, 1);
	});
});

