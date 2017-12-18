import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import IconBox from './IconBox';

describe('IconBox', () => {
	common(IconBox);
	controls(IconBox, {
		callbackName: 'onClick',
		controlSelector: '.lucid-IconBox',
		eventType: 'click',
	});

	describe('IconBox Events', () => {
		it('should call the onClick handler when clicked', () => {
			const onIconBoxClick = sinon.spy();
			const wrapper = mount(<IconBox onClick={onIconBoxClick} />);

			wrapper.find('IconBox').simulate('click');
			assert(onIconBoxClick.calledOnce);
		});

		it('should not use onClick if disabled', () => {
			const onIconBoxClick = sinon.spy();
			const wrapper = mount(
				<IconBox isDisabled={true} onClick={onIconBoxClick} />
			);
			wrapper.find('IconBox').simulate('click');
			assert(!onIconBoxClick.calledOnce);
		});
	});
});
