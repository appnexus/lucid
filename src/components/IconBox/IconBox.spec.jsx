import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import _ from 'lodash';
import { common, controls } from '../../util/generic-tests';

import IconBox from './IconBox';

describe('IconBox', () => {
	common(IconBox);
	controls(IconBox, {
		callbackName: 'onClick',
		controlSelector: '.lucid-IconBox',
		eventType: 'click',
	});

	describe('text', () => {
		it('should allow children as content', () => {
			const text = 'Hello';
			const wrapper = shallow(<IconBox>{text}</IconBox>);
			assert.equal(wrapper.text(), text);
		});
	});

	describe('isDisabled', () => {
		it('should not be disabled by default', () => {
			const wrapper = shallow(<IconBox />);
			assert.equal(wrapper.find('IconBox').prop('disabled'), false);
		});

		it('should show a disabled IconBox', () => {
			const wrapper = shallow(<IconBox isDisabled={true} />);
			assert.equal(wrapper.find('IconBox').prop('disabled'), true);
		});
	});

	describe('css classes', () => {
		// TODO: make this a generic test
		it('should have the IconBox class', () => {
			const wrapper = shallow(<IconBox />);
			const classNames = wrapper.find('IconBox').prop('className').split(' ');
			assert(
				_.includes(classNames, 'lucid-IconBox'),
				`'${classNames}' should include 'lucid-IconBox'`
			);
		});

		it('should have a IconBox with the "active" class when active is true', () => {
			const wrapper = shallow(<IconBox isActive={true} />);
			const classNames = wrapper.find('IconBox').prop('className').split(' ');
			assert(
				_.includes(classNames, 'lucid-IconBox-is-active'),
				`'${classNames}' should include 'lucid-IconBox-is-active'`
			);
		});

		it('should have a IconBox with the "has-only-icon" class when hasOnlyIcon is true', () => {
			const wrapper = shallow(<IconBox hasOnlyIcon={true} />);
			assert(wrapper.hasClass('lucid-IconBox-has-only-icon'));
		});
	});

	describe('type', () => {
		it('should be a IconBox type by default', () => {
			const wrapper = shallow(<IconBox />);
			assert.equal(wrapper.find('IconBox').prop('type'), 'IconBox');
		});

		it('should passthrough IconBox type property', () => {
			const wrapper = shallow(<IconBox type="submit" />);
			assert.equal(wrapper.find('IconBox').prop('type'), 'submit');
		});
	});
});

describe('IconBox', () => {
	describe('click', () => {
		it('should call the onClick handler when clicked', () => {
			const onIconBoxClick = sinon.spy();
			const wrapper = mount(<IconBox onClick={onIconBoxClick} />);
			wrapper.find('IconBox').simulate('click');
			assert(onIconBoxClick.calledOnce);
		});
	});
});
