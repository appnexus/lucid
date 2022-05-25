import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import * as KEYCODE from '../../constants/key-code';
import assert from 'assert';
import TextField from './TextField';
import { MOSTLY_STABLE_DELAY } from '../../util/constants';

const defaultProps = TextField.defaultProps;

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

	describe('props', () => {
		it('should pass though some props to its underlying textarea or input element', () => {
			//const onBlurFunc = () => {};
			const style = { margin: 10 };
			const wrapper = shallow(
				<TextField
					{...defaultProps}
					isDisabled={true}
					style={style}
					rows={10}
					value='test'
				/>
			);
			assert.strictEqual(wrapper.find('input').prop('disabled'), true);
			assert.strictEqual(wrapper.find('input').prop('style'), style);
			assert.strictEqual(wrapper.find('input').prop('rows'), 10);
			assert.strictEqual(wrapper.find('input').prop('value'), 'test');
		});

		it('should not pass though several props to its underlying textarea or input element', () => {
			const nonFinalProps = [
				'onChangeDebounced',
				'onSubmit',
				'debounceLevel',
				'lazyLevel',
				'initialState',
				'callbackId',
				'children',
			];
			const onChangeDebounced = () => {};
			const onSubmit = () => {};
			const wrapper = shallow(
				<TextField
					{...defaultProps}
					callbackId={0}
					onChangeDebounced={onChangeDebounced}
					onSubmit={onSubmit}
					lazyLevel={500}
				/>
			);
			nonFinalProps.forEach((nonFinalProp) => {
				assert.strictEqual(wrapper.find('input').prop(nonFinalProp), undefined);
			});
		});
	});

	it('should correctly debounce onChangeDebounced [mostly stable]', (done) => {
		const event = {
			target: {
				value: 'yolo',
			},
			persist: _.noop,
		};
		const onChangeDebounced = sinon.spy();
		const wrapper = shallow(
			<TextField
				{...defaultProps}
				onChangeDebounced={onChangeDebounced}
				debounceLevel={0}
			/>
		);

		wrapper.find('input').simulate('change', event);

		assert(onChangeDebounced.notCalled);

		_.delay(() => {
			assert(onChangeDebounced.called);
			assert.strictEqual(onChangeDebounced.args[0][0], 'yolo');
			done();
		}, MOSTLY_STABLE_DELAY);
	});

	it('should accept a new `value` prop immediately if the user has not typed anything recently', () => {
		const wrapper = shallow(<TextField {...defaultProps} value='start' />);

		wrapper.setProps({ value: 'end' });

		assert.strictEqual(wrapper.state('value'), 'end');
	});

	// This test had value, but it's been known to be flaky.
	it('should postpone state changes if the user recently typed something in [mostly stable]', (done) => {
		const wrapper = shallow(
			<TextField {...defaultProps} value='start' lazyLevel={1} />
		);

		// Order of operations is crucial for this test
		// 1) User starts typing something in
		// 2) New props comes in from above while the user is typing
		// 3) The props shouldn't take effect until the lazyLevel has elapsed
		assert.strictEqual(wrapper.state('value'), 'start');

		wrapper
			.find('input')
			.simulate('change', { target: { value: 'user typed' } });

		wrapper.setProps({ value: 'end' });

		assert.strictEqual(wrapper.state('value'), 'user typed');

		_.delay(() => {
			assert.strictEqual(wrapper.state('value'), 'end');
			done();
		}, MOSTLY_STABLE_DELAY);
	});

	it('should callback onSubmit when the user hits enter', () => {
		const onSubmit = sinon.spy();
		const wrapper = shallow(
			<TextField {...defaultProps} onSubmit={onSubmit} />
		);

		wrapper.find('input').simulate('keydown', {
			keyCode: KEYCODE.Enter,
			target: {
				value: 'yolo',
			},
		});

		assert(onSubmit.called);
		assert.strictEqual(onSubmit.args[0][0], 'yolo');
	});

	it('should callback onBlur when the leaves input', () => {
		const onBlur = sinon.spy();
		const wrapper = shallow(<TextField {...defaultProps} onBlur={onBlur} />);

		wrapper.find('input').simulate('blur', {
			target: {
				value: 'yolo',
			},
		});

		assert(onBlur.calledOnce);
		assert.strictEqual(onBlur.args[0][0], 'yolo');
	});

	it('should respect isDisabled', () => {
		const wrapper = shallow(<TextField {...defaultProps} isDisabled={true} />);

		assert.strictEqual(wrapper.find('input').prop('disabled'), true);
	});

	it('should respect isMultiLine', () => {
		const wrapper = shallow(<TextField {...defaultProps} isMultiLine={true} />);

		assert.strictEqual(wrapper.find('textarea').length, 1);
		assert.strictEqual(
			wrapper.find('.lucid-TextField-is-multi-line').length,
			1
		);
	});

	it('should respect onKeyDown if passed in', () => {
		const onKeyDown = jest.fn();
		const wrapper = shallow(
			<TextField {...defaultProps} onKeyDown={onKeyDown} />
		);

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
			<TextField {...defaultProps} onChangeDebounced={onChangeDebounced} />
		);

		assert(event.persist.notCalled);

		wrapper.find('input').simulate('change', event);

		assert(event.persist.called);
	});

	it('should flush the `onChangeDebounced`-handled event before blurring', () => {
		const onBlur = sinon.spy();
		const internalChangeSpy = sinon.spy();
		const onChangeDebounced = () => {
			assert(onBlur.notCalled);
			internalChangeSpy();
		};
		const event = {
			target: {
				value: 'foo',
			},
			persist: () => {},
		};

		const wrapper = shallow(
			<TextField
				{...defaultProps}
				onBlur={onBlur}
				debounceLevel={100}
				onChangeDebounced={onChangeDebounced}
			/>
		);

		wrapper.find('input').simulate('change', event);
		assert(internalChangeSpy.notCalled);

		wrapper.find('input').simulate('blur');
		assert(internalChangeSpy.calledOnce);
		assert(onBlur.calledOnce);
	});

	it('should flush the `onChangeDebounced`-handled event before submitting', () => {
		const onSubmit = sinon.spy();
		const internalChangeSpy = sinon.spy();
		const onChangeDebounced = () => {
			assert(onSubmit.notCalled);
			internalChangeSpy();
		};
		const event = {
			target: {
				value: 'foo',
			},
			persist: () => {},
		};

		const wrapper = shallow(
			<TextField
				{...defaultProps}
				onSubmit={onSubmit}
				debounceLevel={100}
				onChangeDebounced={onChangeDebounced}
			/>
		);

		wrapper.find('input').simulate('change', event);
		assert(internalChangeSpy.notCalled);

		wrapper.find('input').simulate('keydown', {
			keyCode: KEYCODE.Enter,
			target: {
				value: 'foo',
			},
		});
		assert(internalChangeSpy.calledOnce);
		assert(onSubmit.calledOnce);
	});
});
