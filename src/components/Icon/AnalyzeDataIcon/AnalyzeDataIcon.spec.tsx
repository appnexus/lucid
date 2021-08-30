import React from 'react';
import { shallow } from 'enzyme';
import { icons, common } from '../../../util/generic-tests';
import assert from 'assert';

import AnalyzeDataIcon from './AnalyzeDataIcon';

describe('AnalyzeDataIcon', () => {
	common(AnalyzeDataIcon);
	icons(AnalyzeDataIcon);

	describe('`direction` prop', () => {
		it('should render the correct icon with "left"', () => {
			const wrapper = shallow(<AnalyzeDataIcon direction='left' />);

			assert.equal(wrapper.find('.lucid-AnalyzeDataIcon-is-left').length, 1);
		});

		it('should render the correct icon with "right"', () => {
			const wrapper = shallow(<AnalyzeDataIcon direction='right' />);

			assert.equal(wrapper.find('.lucid-AnalyzeDataIcon-is-right').length, 1);
		});
	});
});
