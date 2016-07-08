import React from 'react';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import Bar from './Bar';

// Foo Bar... hehehe

describe('Bar', () => {
	common(Bar);

	describe('props', () => {
		describe('x', () => {
			it('should pass through', () => {
				const wrapper = shallow(
					<Bar x={10} />
				);

				assert.equal(wrapper.find('rect').prop('x'), 10);
			});
		});

		describe('y', () => {
			it('should pass through', () => {
				const wrapper = shallow(
					<Bar y={100} />
				);

				assert.equal(wrapper.find('rect').prop('y'), 100);
			});
		});

		describe('height', () => {
			it('should pass through', () => {
				const wrapper = shallow(
					<Bar height={5} />
				);

				assert.equal(wrapper.find('rect').prop('height'), 5);
			});
		});

		describe('width', () => {
			it('should pass through', () => {
				const wrapper = shallow(
					<Bar width={25} />
				);

				assert.equal(wrapper.find('rect').prop('width'), 25);
			});
		});

		describe('color', () => {
			it('should apply color strings as a class', () => {
				const wrapper = shallow(
					<Bar
						color='yolo'
					/>
				);

				assert(wrapper.find('rect').hasClass('lucid-Bar-yolo'), 'missing color class');
			});

			it('should apply custom colors to `style`', () => {
				const wrapper = shallow(
					<Bar
						color='#F00'
					/>
				);

				assert.deepEqual(wrapper.find('rect').prop('style'), {
					fill: '#F00',
				});
			});
		});

		describe('hasStroke', () => {
			it('should apply the correct class', () => {
				const wrapper = shallow(
					<Bar hasStroke />
				);

				assert(wrapper.find('rect').hasClass('lucid-Bar-has-stroke'));
			});
		});

	});
});
