// Note: these tests are basically pin tests, given that we're rendering svgs,
// these tests serve to ensure that the rendered output is exactly at the
// author inteded. As a consequence, you may need to re-pin these tests if you
// change things.

import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import LineChart from './LineChart';

describe('LineChart', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	common(LineChart, {
		exemptFunctionProps: [
			'xAxisFormatter',
			'xAxisTooltipFormatter',
			'yAxisFormatter',
			'y2AxisFormatter',
		],
		getDefaultProps: () => ({
			data: [
				{x: new Date('2015-01-01T00:00:00Z'), y: 1},
				{x: new Date('2015-01-01T00:00:00Z'), y: 2},
			],
		}),
	});

	describe('render', () => {
		it('should render a single axis chart', () => {
			wrapper = mount(
				<LineChart
					data={[
						{x: new Date(), y: 1},
						{x: new Date(), y: 2},
						{x: new Date(), y: 3},
					]}
				/>
			);

			assert.equal(wrapper.find('.lucid-Point').length, 3, 'did not find the correct number of points');
		});

		it('should render a single axis chart with multiple series', () => {
			wrapper = mount(
				<LineChart
					data={[
						{x: new Date(), y: 1, y2: 1},
						{x: new Date(), y: 2, y2: 1},
						{x: new Date(), y: 3, y2: 1},
					]}
					yAxisFields={['y', 'y2']}
				/>
			);

			assert.equal(wrapper.find('.lucid-Line').length, 2, 'did not find the correct number of lines');
		});

		it('should render a dual axis chart', () => {
			wrapper = mount(
				<LineChart
					data={[
						{x: new Date(), y: 1, y2: 1},
						{x: new Date(), y: 2, y2: 1},
						{x: new Date(), y: 3, y2: 1},
					]}
					yAxisFields={['y']}
					y2AxisFields={['y2']}
				/>
			);

			assert.equal(wrapper.find('.lucid-Axis').length, 3, 'did not find the correct number of axes');
		});
	});
});
