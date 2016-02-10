import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import describeWithDOM from '../../util/describe-with-dom';
import _ from 'lodash';
import { common } from '../../util/generic-tests';

import Button from './Button';

describe('Button', () => {
	common(Button);

	describe('text', () => {
		it('should allow children as content', () => {
			let text = 'Hello';
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
			const wrapper = shallow(<Button />);
			let classNames = wrapper.find('button').prop('className').split(' ');
			assert(_.includes(classNames, 'bert-Button'), `'${classNames}' should include 'bert-Button'`);
		});

		it('should have a button with the "active" class when active is true', () => {
			const wrapper = shallow(<Button isActive={true} />);
			let classNames = wrapper.find('button').prop('className').split(' ');
			assert(_.includes(classNames, 'bert-Button-is-active'), `'${classNames}' should include 'bert-Button-is-active'`);
		});

		it('should have a button with the "hasIcon" class when hasIcon is true', () => {
			const wrapper = shallow(<Button hasIcon={true} />);
			let classNames = wrapper.find('button').prop('className').split(' ');
			assert(_.includes(classNames, 'bert-Button-has-icon'), `'${classNames}' should include 'bert-Button-has-icon'`);
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
	});
});

