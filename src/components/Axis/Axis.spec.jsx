import React from 'react';
import * as d3Scale from 'd3-scale';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';
import assert from 'assert';

import Axis from './Axis';

describe('Axis', () => {
	common(Axis, {
		exemptFunctionProps: ['scale', 'tickFormat'],
		getDefaultProps: () => ({
			scale: d3Scale.scaleLinear(),
		}),
	});

	describe('render', () => {
		it('should render a basic axis', () => {
			const scale = d3Scale.scaleLinear()
				.domain([0, 100])
				.range([0, 100]);
			const wrapper = shallow(
				<Axis scale={scale} />
			);

			assert.equal(wrapper.find('.lucid-Axis-tick').length, 11, 'wrong number of ticks');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).text(), '0');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(1).text(), '10');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(2).text(), '20');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(3).text(), '30');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(4).text(), '40');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(5).text(), '50');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(6).text(), '60');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(7).text(), '70');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(8).text(), '80');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(9).text(), '90');
			assert.equal(wrapper.find('.lucid-Axis-tick-text').at(10).text(), '100');
		});
	});

	describe('props', () => {
		describe('scale', () => {
			it('should accept linear scales', () => {
				const scale = d3Scale.scaleLinear()
					.domain([20, 40])
					.range([100, 200]);
				const wrapper = shallow(
					<Axis scale={scale} />
				);

				assert.equal(wrapper.find('.lucid-Axis-tick').length, 11, 'wrong number of ticks');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).text(), '20');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(5).text(), '30');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(10).text(), '40');
			});

			it('should accept band scales', () => {
				const scale = d3Scale.scaleBand()
					.domain(['one', 'two', 'three'])
					.range([0, 10])
					.paddingInner(1);
				const wrapper = shallow(
					<Axis scale={scale} />
				);

				assert.equal(wrapper.find('.lucid-Axis-tick').length, 3, 'wrong number of ticks');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).text(), 'one');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(1).text(), 'two');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(2).text(), 'three');
			});

			it.skip('should accept time scales', () => {
				const scale = d3Scale.scaleTime()
					.domain([
						new Date('2015-01-01T00:00:00Z'),
						new Date('2015-01-02T00:00:00Z'),
					])
					.range([0, 10]);
				const wrapper = shallow(
					<Axis scale={scale} />
				);

				assert.equal(wrapper.find('.lucid-Axis-tick').length, 9, 'wrong number of ticks');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).text(), '2015');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(4).text(), '12 PM');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(8).text(), 'Fri 02');
			});
		});


		describe('innerTickSize', () => {
			it('should pass the correct value to <line/> when horizontal', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='bottom'
						innerTickSize={15}
					/>
				);

				const firstTick = wrapper.find('.lucid-Axis-tick').at(0);

				assert.equal(firstTick.prop('x2'), 0);
				assert.equal(firstTick.prop('y2'), 15);
			});

			it('should pass the correct value to <line/> when vertical', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='left'
						innerTickSize={20}
					/>
				);

				const firstTick = wrapper.find('.lucid-Axis-tick').at(0);

				assert.equal(firstTick.prop('x2'), -20);
				assert.equal(firstTick.prop('y2'), 0);
			});
		});

		describe('outerTickSize', () => {
			it('should have the correct path when horizontal', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='bottom'
						outerTickSize={7}
					/>
				);

				assert.equal(
					wrapper.find('.lucid-Axis-domain').prop('d'),
					'M0,7V0H100V7'
				);
			});

			it('should have the correct path when vertical', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='left'
						outerTickSize={2}
					/>
				);

				assert.equal(
					wrapper.find('.lucid-Axis-domain').prop('d'),
					'M-2,0H0V100H-2'
				);
			});
		});

		describe('tickFormat', () => {
			it('should format ticks', () => {
				const scale = d3Scale.scaleBand()
					.domain(['a', 'b'])
					.range([0, 10]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						tickFormat={s => s.toUpperCase()}
					/>
				);

				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).text(), 'A');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(1).text(), 'B');
			});
		});

		describe('ticks', () => {
			it('should allow for custom ticks', () => {
				const scale = d3Scale.scaleBand()
					.domain(['one', 'two', 'three'])
					.range([0, 10]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						ticks={['one', 'three']}
					/>
				);

				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).text(), 'one');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(1).text(), 'three');
			});
		});

		describe('tickPadding', () => {
			it('should adjust spacing accordingly when horizontal', () => {
				const scale = d3Scale.scaleBand()
					.domain(['one', 'two', 'three'])
					.range([0, 10]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='bottom'
						innerTickSize={5}
						tickPadding={10}
					/>
				);

				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).prop('x'), 0);
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).prop('y'), 15);
			});

			it('should adjust spacing accordingly when vertical', () => {
				const scale = d3Scale.scaleBand()
					.domain(['one', 'two', 'three'])
					.range([0, 10]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='right'
						innerTickSize={5}
						tickPadding={10}
					/>
				);

				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).prop('x'), 15);
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).prop('y'), 0);
			});
		});

		describe('orient', () => {
			it('should handle top', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='top'
						innerTickSize={6}
						outerTickSize={6}
						tickPadding={3}
					/>
				);

				const firstTick = wrapper.find('.lucid-Axis-tick').at(0);
				const firstTickText = wrapper.find('.lucid-Axis-tick-text').at(0);

				assert.equal(wrapper.find('.lucid-Axis-domain').prop('d'), 'M0,-6V0H100V-6');
				assert.equal(firstTick.prop('x2'), 0);
				assert.equal(firstTick.prop('y2'), -6);
				assert.equal(firstTickText.prop('x'), 0);
				assert.equal(firstTickText.prop('y'), -9);
			});

			it('should handle bottom', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='bottom'
						innerTickSize={6}
						outerTickSize={6}
						tickPadding={3}
					/>
				);

				const firstTick = wrapper.find('.lucid-Axis-tick').at(0);
				const firstTickText = wrapper.find('.lucid-Axis-tick-text').at(0);

				assert.equal(wrapper.find('.lucid-Axis-domain').prop('d'), 'M0,6V0H100V6');
				assert.equal(firstTick.prop('x2'), 0);
				assert.equal(firstTick.prop('y2'), 6);
				assert.equal(firstTickText.prop('x'), 0);
				assert.equal(firstTickText.prop('y'), 9);
			});

			it('should handle left', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='left'
						innerTickSize={6}
						outerTickSize={6}
						tickPadding={3}
					/>
				);

				const firstTick = wrapper.find('.lucid-Axis-tick').at(0);
				const firstTickText = wrapper.find('.lucid-Axis-tick-text').at(0);

				assert.equal(wrapper.find('.lucid-Axis-domain').prop('d'), 'M-6,0H0V100H-6');
				assert.equal(firstTick.prop('x2'), -6);
				assert.equal(firstTick.prop('y2'), 0);
				assert.equal(firstTickText.prop('x'), -9);
				assert.equal(firstTickText.prop('y'), 0);
			});

			it('should handle right', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						orient='right'
						innerTickSize={6}
						outerTickSize={6}
						tickPadding={3}
					/>
				);

				const firstTick = wrapper.find('.lucid-Axis-tick').at(0);
				const firstTickText = wrapper.find('.lucid-Axis-tick-text').at(0);

				assert.equal(wrapper.find('.lucid-Axis-domain').prop('d'), 'M6,0H0V100H6');
				assert.equal(firstTick.prop('x2'), 6);
				assert.equal(firstTick.prop('y2'), 0);
				assert.equal(firstTickText.prop('x'), 9);
				assert.equal(firstTickText.prop('y'), 0);
			});
		});

		describe('tickCount', () => {
			it('should be exact for band scales', () => {
				const scale = d3Scale.scaleBand()
					.domain(['one', 'two', 'three'])
					.range([0, 10]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						tickCount={2}
					/>
				);

				assert.equal(wrapper.find('.lucid-Axis-tick').length, 2, 'wrong number of ticks');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(0).text(), 'one');
				assert.equal(wrapper.find('.lucid-Axis-tick-text').at(1).text(), 'three');
			});

			it('should be approximate for linear scales', () => {
				const scale = d3Scale.scaleLinear()
					.domain([1, 1000])
					.range([0, 10]);
				const wrapper = shallow(
					<Axis
						scale={scale}
						tickCount={4}
					/>
				);

				assert.equal(wrapper.find('.lucid-Axis-tick').length, 5, 'wrong number of ticks');
			});
		});
	});
});
