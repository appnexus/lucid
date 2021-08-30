import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import AttachIcon from './AttachIcon';

describe('AttachIcon', () => {
	common(AttachIcon);
	icons(AttachIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<AttachIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-AttachIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<AttachIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-AttachIcon-is-right').length, 1);
		});
	});
});
