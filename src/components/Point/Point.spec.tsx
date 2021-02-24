import React from 'react';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import Point from './Point';

describe('Point', () => {
	common(Point);

	describe('props', () => {
		describe('x', () => {
			it('should transform accordingly', () => {
				const wrapper = shallow(<Point x={10} />);

				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(4, -6) scale(1)'
				);
			});
		});

		describe('y', () => {
			it('should transform accordingly', () => {
				const wrapper = shallow(<Point y={100} />);

				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-6, 94) scale(1)'
				);
			});
		});

		describe('kind', () => {
			it('should have the correct path and transform for type 0', () => {
				const wrapper = shallow(<Point kind={0} />);

				assert.equal(
					wrapper.find('path').prop('d'),
					'M6,12 C2.686,12 0,9.314 0,6 C0,2.686 2.686,0 6,0 C9.314,-0 12,2.686 12,6 C12,9.314 9.314,12 6,12 z'
				);
				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-6, -6) scale(1)'
				);
			});

			it('should have the correct path and transform for type 1', () => {
				const wrapper = shallow(<Point kind={1} />);

				assert.equal(
					wrapper.find('path').prop('d'),
					'M6,12 C0,12 0,12 0,6 C0,0 -0,0 6,0 C12,0 12,0 12,6 C12,12 12,12 6,12 z'
				);
				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-6, -6) scale(1)'
				);
			});

			it('should have the correct path and transform for type 2', () => {
				const wrapper = shallow(<Point kind={2} />);

				assert.equal(
					wrapper.find('path').prop('d'),
					'M6.034,1.656 C7,0 7,0 7.966,1.656 L13.034,10.344 C14,12 13,12 12,12 L2,12 C1,12 0,12 0.966,10.344 L6.034,1.656 z'
				);
				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-7, -6) scale(1)'
				);
			});

			it('should have the correct path and transform for type 3', () => {
				const wrapper = shallow(<Point kind={3} />);

				assert.equal(
					wrapper.find('path').prop('d'),
					'M7.966,10.344 C7,12 7,12 6.034,10.344 L0.966,1.656 C-0,0 1,0 2,0 L12,0 C13,0 14,0 13.034,1.656 L7.966,10.344 z'
				);
				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-7, -6) scale(1)'
				);
			});

			it('should have the correct path and transform for type 4', () => {
				const wrapper = shallow(<Point kind={4} />);

				assert.equal(
					wrapper.find('path').prop('d'),
					'M2.594,9.406 C-0.812,6 -0.812,6 2.594,2.594 C6,-0.812 6,-0.812 9.406,2.594 C12.812,6 12.812,6 9.406,9.406 C6,12.812 6,12.812 2.594,9.406 z'
				);
				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-6, -6) scale(1)'
				);
			});

			// Loops back to the first point kind
			it('should have the correct path and transform for type 5', () => {
				const wrapper = shallow(<Point kind={5} />);

				assert.equal(
					wrapper.find('path').prop('d'),
					'M6,12 C2.686,12 0,9.314 0,6 C0,2.686 2.686,0 6,0 C9.314,-0 12,2.686 12,6 C12,9.314 9.314,12 6,12 z'
				);
				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-6, -6) scale(1)'
				);
			});
		});

		describe('scale', () => {
			it('should adjust the transform accordingly', () => {
				const wrapper = shallow(<Point kind={0} scale={5} />);

				assert.equal(
					wrapper.find('path').prop('transform'),
					'translate(-30, -30) scale(5)'
				);
			});
		});

		describe('color', () => {
			it('should apply color strings as a class', () => {
				const wrapper = shallow(<Point color='yolo' />);

				assert(
					wrapper.find('path').hasClass('lucid-Point-yolo'),
					'missing color class'
				);
			});

			it('should apply custom colors to `style`', () => {
				const wrapper = shallow(<Point color='#F00' />);

				assert.deepEqual(wrapper.find('path').prop('style'), {
					fill: '#F00',
				});
			});
		});

		describe('hasStroke', () => {
			it('should apply the correct class', () => {
				const wrapper = shallow(<Point hasStroke />);

				assert(wrapper.find('path').hasClass('lucid-Point-has-stroke'));
			});
		});
	});
});
