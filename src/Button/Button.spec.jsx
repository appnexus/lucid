import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import describeWithDOM from '../util/describeWithDOM';
import _ from 'lodash';

import Button from './Button';

describe('Button', () => {
	describe('text', () => {
		it('should children as content', () => {
			let text = 'Hello';
			const wrapper = shallow(<Button>{text}</Button>);
			assert.equal(wrapper.text(), text);
		});

		it('should show text as content', () => {
			let text = 'button content';
			const wrapper = shallow(<Button text={text} />);
			assert.equal(wrapper.text(), text);
		});
	});

	describe('disable', () => {
		it('should not be disabled by default', () => {
			const wrapper = shallow(<Button />);
			assert.equal(wrapper.find('button').prop('disabled'), false);
		});

		it('should show a disabled button', () => {
			const wrapper = shallow(<Button disable={true} />);
			assert.equal(wrapper.find('button').prop('disabled'), true);
		});
	});

	describe('css classes', () => {
		it('should have the ArButton class', () => {
			const wrapper = shallow(<Button />);
			let classNames = wrapper.find('button').prop('className').split(' ');
			assert(_.includes(classNames, 'ArButton'), `'${classNames}' should include 'ArButton'`);
		});

		it('should have a button with the "active" class when active is true', () => {
			const wrapper = shallow(<Button active={true} />);
			let classNames = wrapper.find('button').prop('className').split(' ');
			assert(_.includes(classNames, 'active'), `'${classNames}' should include 'active'`);
		});

		it('should have a button with the "hasIcon" class when hasIcon is true', () => {
			const wrapper = shallow(<Button hasIcon={true} />);
			let classNames = wrapper.find('button').prop('className').split(' ');
			assert(_.includes(classNames, 'hasIcon'), `'${classNames}' should include 'hasIcon'`);
		});
	});
});

describeWithDOM('Button', () => {
	describe('click', () => {
		it('should call the onClick handler when clicked', () => {
			const onButtonClick = sinon.spy();
			const wrapper = mount(
				<Button onClick={onButtonClick} />
			);
			wrapper.find('button').simulate('click');
			assert(onButtonClick.calledOnce);
		});

		it('should call the onTrigger handler when clicked', () => {
			const onButtonClick = sinon.spy();
			const wrapper = mount(
				<Button onTrigger={onButtonClick} />
			);
			wrapper.find('button').simulate('click');
			assert(onButtonClick.calledOnce);
		});
	});
});

