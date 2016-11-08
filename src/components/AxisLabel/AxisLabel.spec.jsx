import React from 'react';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import AxisLabel from './AxisLabel';

describe('AxisLabel', () => {
	common(AxisLabel, {
		getDefaultProps: () => ({
			height: 100,
			width: 100,
		}),
	});

	describe('props', () => {
		describe('width, height, and orient', () => {
			it('should center within the given width for `top`', () => {
				const wrapper = shallow(
					<AxisLabel
						label='Groovy'
						orient='top'
						height={0}
						width={50}
					/>
				);

				assert.equal(wrapper.find('text').prop('x'), 25);
				assert.equal(wrapper.find('text').prop('y'), 0);
				assert.equal(wrapper.find('text').prop('dy'), '1em');
			});

			it('should center within the given width for `bottom`', () => {
				const wrapper = shallow(
					<AxisLabel
						label='Groovy'
						orient='bottom'
						height={0}
						width={50}
					/>
				);

				assert.equal(wrapper.find('text').prop('x'), 25);
				assert.equal(wrapper.find('text').prop('y'), 0);
				assert.equal(wrapper.find('text').prop('dy'), '-.32em');
			});

			it('should center within the given height for `left`', () => {
				const wrapper = shallow(
					<AxisLabel
						label='Groovy'
						orient='left'
						height={80}
						width={0}
					/>
				);

				assert.equal(wrapper.find('text').prop('x'), -40);
				assert.equal(wrapper.find('text').prop('y'), 0);
				assert.equal(wrapper.find('text').prop('dy'), '1em');
			});

			it('should center within the given height for `right`', () => {
				const wrapper = shallow(
					<AxisLabel
						label='Groovy'
						orient='right'
						height={80}
						width={0}
					/>
				);

				assert.equal(wrapper.find('text').prop('x'), -40);
				assert.equal(wrapper.find('text').prop('y'), 0);
				assert.equal(wrapper.find('text').prop('dy'), '-.32em');
			});
		});

		describe('color', () => {
			it('should apply color strings as a class', () => {
				const wrapper = shallow(
					<AxisLabel
						width={0}
						height={0}
						color='yolo'
					/>
				);

				assert(wrapper.find('text').hasClass('lucid-AxisLabel-yolo'), 'missing color class');
			});

			it('should apply custom colors to `style`', () => {
				const wrapper = shallow(
					<AxisLabel
						width={0}
						height={0}
						color='#F00'
					/>
				);

				assert.deepEqual(wrapper.find('text').prop('style'), {
					fill: '#F00',
				});
			});
		});

		describe('label', () => {
			it('should render a label', () => {
				const wrapper = shallow(
					<AxisLabel
						width={0}
						height={0}
						label='Foo'
					/>
				);

				assert.equal(wrapper.text(), 'Foo');
			});
		});
	});
});



