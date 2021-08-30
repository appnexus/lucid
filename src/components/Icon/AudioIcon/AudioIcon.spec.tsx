import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import AudioIcon from './AudioIcon';

describe('AudioIcon', () => {
	common(AudioIcon);
	icons(AudioIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<AudioIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-AudioIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<AudioIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-AudioIcon-is-right').length, 1);
		});
	});
});
