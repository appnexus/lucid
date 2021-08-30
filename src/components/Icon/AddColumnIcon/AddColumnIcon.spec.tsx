import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import AddColumnIcon from './AddColumnIcon';

describe('AddColumnIcon', () => {
	common(AddColumnIcon);
	icons(AddColumnIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<AddColumnIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-AddColumnIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<AddColumnIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-AddColumnIcon-is-right').length, 1);
		});
	});
});
