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
			assert.equal(wrapper.text(), text);
		});
	});

	describe('isDisabled', () => {
		it('should not be disabled by default', () => {
			const wrapper = shallow(<ButtonWithIcon />);
			assert.equal(wrapper.find('ButtonWithIcon').prop('disabled'), false);
		});

		it('should show a disabled button', () => {
			const wrapper = shallow(<ButtonWithIcon isDisabled={true} />);
			assert.equal(wrapper.find('ButtonWithIcon').prop('disabled'), true);
		});
	});

	describe('css classes', () => {
		// TODO: make this a generic test
		it('should have the ButtonWithIcon class', () => {
			const wrapper = shallow(<ButtonWithIcon />);
			const classNames = wrapper
				.find('ButtonWithIcon')
				.prop('className')
				.split(' ');
			assert(
				_.includes(classNames, 'lucid-ButtonWithIcon'),
				`'${classNames}' should include 'lucid-ButtonWithIcon'`
			);
		});

		it('should have a ButtonWithIcon with the "active" class when active is true', () => {
			const wrapper = shallow(<ButtonWithIcon isActive={true} />);
			const classNames = wrapper
				.find('ButtonWithIcon')
				.prop('className')
				.split(' ');
			assert(
				_.includes(classNames, 'lucid-ButtonWithIcon-is-active'),
				`'${classNames}' should include 'lucid-ButtonWithIcon-is-active'`
			);
		});
	});

	describe('type', () => {
		it('should be a ButtonWithIcon type by default', () => {
			const wrapper = shallow(<ButtonWithIcon />);
			assert.equal(
				wrapper.find('ButtonWithIcon').prop('type'),
				'ButtonWithIcon'
			);
		});

		it('should passthrough ButtonWithIcon type property', () => {
			const wrapper = shallow(<ButtonWithIcon type="submit" />);
			assert.equal(wrapper.find('ButtonWithIcon').prop('type'), 'submit');
		});
	});
});

describe('ButtonWithIcon', () => {
	describe('click', () => {
		it('should call the onClick handler when clicked', () => {
			const onButtonClick = sinon.spy();
			const wrapper = mount(<ButtonWithIcon onClick={onButtonClick} />);
			wrapper.find('ButtonWithIcon').simulate('click');
			assert(onButtonClick.calledOnce);
		});
	});
});
