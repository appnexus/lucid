import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import PinIcon from './PinIcon';

describe('PinIcon', () => {
	common(PinIcon);
	icons(PinIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<PinIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-PinIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<PinIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-PinIcon-is-right').length, 1);
		});
	});
});
