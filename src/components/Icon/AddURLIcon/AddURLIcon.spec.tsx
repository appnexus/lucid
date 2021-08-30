import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import AddURLIcon from './AddURLIcon';

describe('AddURLIcon', () => {
	common(AddURLIcon);
	icons(AddURLIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<AddURLIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-AddURLIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<AddURLIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-AddURLIcon-is-right').length, 1);
		});
	});
});
