import React from 'react';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import Line from './Line';

describe('Line', () => {
	common(Line);

	describe('props', () => {
		describe('d', () => {
			it('should pass through', () => {
				const wrapper = shallow(<Line d='foo' />);

				assert.equal(wrapper.find('path').prop('d'), 'foo');
			});
		});

		describe('color', () => {
			it('should apply color strings as a class', () => {
				const wrapper = shallow(<Line color='wat' />);

				assert(
					wrapper.find('path').hasClass('lucid-Line-wat'),
					'missing color class'
				);
			});

			it('should apply custom colors to `style`', () => {
				const wrapper = shallow(<Line color='#A00B00' />);

				assert.deepEqual(wrapper.find('path').prop('style'), {
					fill: '#A00B00',
					stroke: '#A00B00',
				});
			});
		});

		describe('isDotted', () => {
			it('should apply the correct class', () => {
				const wrapper = shallow(<Line isDotted />);

				assert(wrapper.find('path').hasClass('lucid-Line-is-dotted'));
			});
		});
	});
});
