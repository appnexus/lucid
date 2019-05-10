import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import ChevronIcon from './ChevronIcon';

describe('ChevronIcon', () => {
	common(ChevronIcon);
	icons(ChevronIcon);

	describe('`direction` prop', () => {
		it('should render the correct class with "up"', () => {
			const wrapper = shallow(<ChevronIcon direction='up' />);

			assert.equal(wrapper.find('.lucid-ChevronIcon-is-up').length, 1);
		});

		it('should render the correct class with "down"', () => {
			const wrapper = shallow(<ChevronIcon direction='down' />);

			assert.equal(wrapper.find('.lucid-ChevronIcon-is-down').length, 1);
		});

		it('should render the correct class with "left"', () => {
			const wrapper = shallow(<ChevronIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-ChevronIcon-is-left').length, 1);
		});

		it('should render the correct class with "right"', () => {
			const wrapper = shallow(<ChevronIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-ChevronIcon-is-right').length, 1);
		});
	});
});
