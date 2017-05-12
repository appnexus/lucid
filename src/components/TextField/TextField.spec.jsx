import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { common, controls } from '../../util/generic-tests';
import * as KEYCODE from '../../constants/key-code';
import assert from 'assert';
import TextField from './TextField';
import { MOSTLY_STABLE_DELAY } from '../../../tests/constants';

describe('TextField', () => {
	common(TextField);
	controls(TextField, {
		callbackName: 'onChange',
		controlSelector: '.lucid-TextField',
		eventType: 'change',
		additionalProps: {
			value: '123',
		},
	});

	it('should correctly debounce onChangeDebounced [mostly stable]', done => {
		const event = {
			target: {
				value: 'yolo',
			},
			persist: _.noop,
		};
		const onChangeDebounced = sinon.spy();
		const wrapper = shallow(
			<TextField onChangeDebounced={onChangeDebounced} debounceLevel={0} />
		);

		wrapper.find('input').simulate('change', event);

		assert(onChangeDebounced.notCalled);

		_.delay(() => {
			assert(onChangeDebounced.called);
			assert.equal(onChangeDebounced.args[0][0], 'yolo');
			done();
		}, MOSTLY_STABLE_DELAY);
	});

	it('should accept a new `value` prop immediately if the user hasnt typed anything recently', () => {
		const wrapper = shallow(<TextField value="start" />);

		wrapper.setProps({ value: 'end' });

		assert.equal(wrapper.state('value'), 'end');
	});

	// This test had value, but it's been known to be flaky.
	it('should postpone state changes if the user recently typed something in [mostly stable]', done => {
		const wrapper = shallow(<TextField value="start" lazyLevel={1} />);

		// Order of operations is crucial for this test
		// 1) User starts typing something in
		// 2) New props comes in from above while the user is typing
		// 3) The props shouldn't take effect until the lazyLevel has elapsed
		assert.equal(wrapper.state('value'), 'start');

		wrapper
			.find('input')
			.simulate('change', { target: { value: 'user typed' } });

		wrapper.setProps({ value: 'end' });

		assert.equal(wrapper.state('value'), 'user typed');

		_.delay(() => {
			assert.equal(wrapper.state('value'), 'end');
			done();
		}, MOSTLY_STABLE_DELAY);
	});

	it('should callback onSubmit when the user hits enter', () => {
		const onSubmit = sinon.spy();
		const wrapper = shallow(<TextField onSubmit={onSubmit} />);

		wrapper.find('input').simulate('keydown', {
			keyCode: KEYCODE.Enter,
			target: {
				value: 'yolo',
			},
		});

		assert(onSubmit.called);
		assert.equal(onSubmit.args[0][0], 'yolo');
	});

	it('should callback onBlur when the leaves input', () => {
		const onBlur = sinon.spy();
		const wrapper = shallow(<TextField onBlur={onBlur} />);

		wrapper.find('input').simulate('blur', {
			target: {
				value: 'yolo',
			},
		});

		assert(onBlur.calledOnce);
		assert.equal(onBlur.args[0][0], 'yolo');
	});

	it('should respect isDisabled', () => {
		const wrapper = shallow(<TextField isDisabled={true} />);

		assert.equal(wrapper.find('input').prop('disabled'), true);
	});

	it('should respect isMultiLine', () => {
		const wrapper = shallow(<TextField isMultiLine={true} />);

		assert.equal(wrapper.find('textarea').length, 1);
		assert.equal(wrapper.find('.lucid-TextField-is-multi-line').length, 1);
	});

	it('should respect onKeyDown if passed in', () => {
		const onKeyDown = jest.fn();
		const wrapper = shallow(<TextField onKeyDown={onKeyDown} />);

		wrapper.find('input').simulate('keydown', {});

		expect(onKeyDown).toBeCalled();
	});

	it('should call `event.persist` for `onChangeDebounced`', () => {
		const event = {
			target: {
				value: 'yolo',
			},
			persist: sinon.spy(),
		};
		const onChangeDebounced = () => {}; // intentionally not _.noop
		const wrapper = shallow(
			<TextField onChangeDebounced={onChangeDebounced} />
		);

		assert(event.persist.notCalled);

		wrapper.find('input').simulate('change', event);

		assert(event.persist.called);
	});
});
