import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import _ from 'lodash';
import { common, controls } from '../../util/generic-tests';

import ButtonWithIcon from './ButtonWithIcon';

describe('ButtonWithIcon', () => {
	common(ButtonWithIcon);
	controls(ButtonWithIcon, {
		callbackName: 'onClick',
		controlSelector: '.lucid-ButtonWithIcon',
		eventType: 'click',
	});

	describe('text', () => {
		it('should allow children as content', () => {
			const text = 'Hello';
			const wrapper = shallow(<ButtonWithIcon>{text}</ButtonWithIcon>);
			const button = wrapper.find('Button');
			assert.equal(button.render().text(), text);
		});
	});

	describe('css classes', () => {
		// TODO: make this a generic test
		it('should have the ButtonWithIcon class', () => {
			const wrapper = shallow(<ButtonWithIcon />);
			const classNames = wrapper
				.find('Button')
				.prop('className')
				.split(' ');
			assert(
				_.includes(classNames, 'lucid-ButtonWithIcon'),
				`'${classNames}' should include 'lucid-ButtonWithIcon'`
			);
		});
	});

	describe('type', () => {
		it('should be a ButtonWithIcon type by default', () => {
			const wrapper = shallow(<ButtonWithIcon />);
			assert.equal(wrapper.find('Button').prop('type'), 'button');
		});

		it('should passthrough ButtonWithIcon type property', () => {
			const wrapper = shallow(<ButtonWithIcon type="submit" />);
			assert.equal(wrapper.find('Button').prop('type'), 'submit');
		});
	});

	describe('click', () => {
		it('should call the onClick handler when clicked', () => {
			const onButtonClick = sinon.spy();
			const wrapper = mount(<ButtonWithIcon onClick={onButtonClick} />);
			wrapper.find('ButtonWithIcon').simulate('click');
			assert(onButtonClick.calledOnce);
		});
	});
});
