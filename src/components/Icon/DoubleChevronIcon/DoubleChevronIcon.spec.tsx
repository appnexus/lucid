import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import DoubleChevronIcon from './DoubleChevronIcon';

describe('DoubleChevronIcon', () => {
	common(DoubleChevronIcon);
	icons(DoubleChevronIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "up"', () => {
			const wrapper = shallow(<DoubleChevronIcon direction='up' />);

			assert.equal(wrapper.find('.lucid-DoubleChevronIcon-is-up').length, 1);
		});

		it('should render the correct icon with "down"', () => {
			const wrapper = shallow(<DoubleChevronIcon direction='down' />);

			assert.equal(wrapper.find('.lucid-DoubleChevronIcon-is-down').length, 1);
		});

		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<DoubleChevronIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-DoubleChevronIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<DoubleChevronIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-DoubleChevronIcon-is-right').length, 1);
		});
	});
});
