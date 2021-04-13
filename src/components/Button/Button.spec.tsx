import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import _ from 'lodash';
import { common, controls } from '../../util/generic-tests';

import Button from './Button';

describe('Button', () => {
	common(Button);
	controls(Button, {
		callbackName: 'onClick',
		controlSelector: '.lucid-Button',
		eventType: 'click',
	});

	describe('text', () => {
		it('should allow children as content', () => {
			const text = 'Hello';
			const wrapper = shallow(<Button>{text}</Button>);
			assert.equal(wrapper.text(), text);
		});
	});

	describe('isDisabled', () => {
		it('should not be disabled by default', () => {
			const wrapper = shallow(<Button />);
			assert.equal(wrapper.find('button').prop('disabled'), false);
		});

		it('should show a disabled button', () => {
			const wrapper = shallow(<Button isDisabled={true} />);
			assert.equal(wrapper.find('button').prop('disabled'), true);
		});
	});

	describe('css classes', () => {
		// TODO: make this a generic test
		it('should have the Button class', () => {
			const wrapper: any = shallow(<Button />);
			const classNames = wrapper.find('button').prop('className').split(' ');
			assert(
				_.includes(classNames, 'lucid-Button'),
				`'${classNames}' should include 'lucid-Button'`
			);
		});

		it('should have a button with the "active" class when active is true', () => {
			const wrapper: any = shallow(<Button isActive={true} />);
			const classNames = wrapper.find('button').prop('className').split(' ');
			assert(
				_.includes(classNames, 'lucid-Button-is-active'),
				`'${classNames}' should include 'lucid-Button-is-active'`
			);
		});

		it('should have a button with the "has-only-icon" class when hasOnlyIcon is true', () => {
			const wrapper = shallow(<Button hasOnlyIcon={true} />);
			assert(wrapper.hasClass('lucid-Button-has-only-icon'));
		});
	});

	describe('type', () => {
		it('should be a button type by default', () => {
			const wrapper = shallow(<Button />);
			assert.equal(wrapper.find('button').prop('type'), 'button');
		});

		it('should passthrough button type property', () => {
			const wrapper = shallow(<Button type='submit' />);
			assert.equal(wrapper.find('button').prop('type'), 'submit');
		});
	});
});

describe('Button', () => {
	describe('click', () => {
		it('should call the onClick handler when clicked', () => {
			const onButtonClick = sinon.spy();
			const wrapper = mount(<Button onClick={onButtonClick} />);
			wrapper.find('button').simulate('click');
			assert(onButtonClick.calledOnce);
		});
	});
});
