import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import ArrowIcon from './ArrowIcon';

describe('ArrowIcon', () => {
	common(ArrowIcon);
	icons(ArrowIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<ArrowIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-ArrowIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<ArrowIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-ArrowIcon-is-right').length, 1);
		});
	});
});
