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

		it.skip('should have the correct html', () => {
			wrapper = mount(
				<LineChart
					height={500}
					width={1000}
					margins={{
						top: 50,
						right: 50,
						bottom: 50,
						left: 50,
					}}
					data={[
						{date: new Date('2015-01-01T00:00:00Z'), ctr: 0.001, imps: 10},
						{date: new Date('2015-01-02T00:00:00Z'), ctr: 0.002, imps: 97},
						{date: new Date('2015-01-03T00:00:00Z'), ctr: 0.004, imps: 50},
					]}

					xAxisField='date'
					xAxisTitle='Date'
					xAxisTickCount={8}
					xAxisFormatter={() => 'x axis tick'}

					yAxisFields={['ctr']}
					yAxisTitle='Click Through Rate'
					yAxisTickCount={5}
					yAxisFormatter={() => 'y axis tick'}

					y2AxisFields={['imps']}
					y2AxisTitle='Impressions'
					y2AxisTickCount={2}
					y2AxisFormatter={() => 'y2 axis tick'}
				/>
			);

			assert.equal(wrapper.html(), '<svg class="lucid-LineChart" width="1000" height="500"><g transform="translate(80, 10)"></g><g transform="translate(80, 435)"><g class="lucid-Axis"><path class="lucid-Axis-domain" d="M0,0V0H840V0"></path><g transform="translate(0, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(105, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(210, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(315, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(420, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(525, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(630, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(735, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g><g transform="translate(840, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">x axis tick</text></g></g></g><g transform="translate(80, 435)"><text style="fill:#000;" class="lucid-AxisLabel" x="420" y="65" dy="-.32em" transform="">Date</text></g><g transform="translate(80, 10)"><g class="lucid-Axis"><path class="lucid-Axis-domain" d="M-6,425H0V0H-6"></path><g transform="translate(0, 425)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g><g transform="translate(0, 318.75)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g><g transform="translate(0, 212.5)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g><g transform="translate(0, 106.25)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g><g transform="translate(0, 0)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g></g></g><g transform="translate(0, 10)"><text style="fill:#000;" class="lucid-AxisLabel" x="-212.5" y="0" dy="1em" transform="rotate(-90)">Click Through Rate</text></g><g transform="translate(920, 10)"><g class="lucid-Axis"><path class="lucid-Axis-domain" d="M6,425H0V0H6"></path><g transform="translate(0, 425)"><line class="lucid-Axis-tick" x2="6" y2="0"></line><text class="lucid-Axis-tick-text" x="9" y="0" dy=".32em" style="text-anchor:start;">y2 axis tick</text></g><g transform="translate(0, 205.92783505154642)"><line class="lucid-Axis-tick" x2="6" y2="0"></line><text class="lucid-Axis-tick-text" x="9" y="0" dy=".32em" style="text-anchor:start;">y2 axis tick</text></g></g></g><g transform="translate(920, 10)"><text style="fill:#000;" class="lucid-AxisLabel" x="-212.5" y="80" dy="-.32em" transform="rotate(-90)">Impressions</text></g><g transform="translate(80, 10)"><g class="lucid-Lines"><g><path class="lucid-Line lucid-Line-color-chart-0" d="M0,318.75L420,212.5L840,0L840,0L420,212.5L0,318.75Z"></path></g></g></g><g transform="translate(80, 10)"><g class="lucid-Points"><path class="lucid-Point lucid-Point-has-stroke lucid-Point-color-chart-0" transform="translate(-6, 312.75) scale(1)" d="M6,12 C2.686,12 0,9.314 0,6 C0,2.686 2.686,0 6,0 C9.314,-0 12,2.686 12,6 C12,9.314 9.314,12 6,12 z"></path><path class="lucid-Point lucid-Point-has-stroke lucid-Point-color-chart-0" transform="translate(414, 206.5) scale(1)" d="M6,12 C2.686,12 0,9.314 0,6 C0,2.686 2.686,0 6,0 C9.314,-0 12,2.686 12,6 C12,9.314 9.314,12 6,12 z"></path><path class="lucid-Point lucid-Point-has-stroke lucid-Point-color-chart-0" transform="translate(834, -6) scale(1)" d="M6,12 C2.686,12 0,9.314 0,6 C0,2.686 2.686,0 6,0 C9.314,-0 12,2.686 12,6 C12,9.314 9.314,12 6,12 z"></path></g></g><g transform="translate(80, 10)"><g class="lucid-Lines"><g><path class="lucid-Line lucid-Line-color-chart-1" d="M0,381.1855670103093L420,0L840,205.92783505154642L840,205.92783505154642L420,0L0,381.1855670103093Z"></path></g></g></g><g transform="translate(80, 10)"><g class="lucid-Points"><path class="lucid-Point lucid-Point-has-stroke lucid-Point-color-chart-1" transform="translate(-6, 375.1855670103093) scale(1)" d="M6,12 C0,12 0,12 0,6 C0,0 -0,0 6,0 C12,0 12,0 12,6 C12,12 12,12 6,12 z"></path><path class="lucid-Point lucid-Point-has-stroke lucid-Point-color-chart-1" transform="translate(414, -6) scale(1)" d="M6,12 C0,12 0,12 0,6 C0,0 -0,0 6,0 C12,0 12,0 12,6 C12,12 12,12 6,12 z"></path><path class="lucid-Point lucid-Point-has-stroke lucid-Point-color-chart-1" transform="translate(834, 199.92783505154642) scale(1)" d="M6,12 C0,12 0,12 0,6 C0,0 -0,0 6,0 C12,0 12,0 12,6 C12,12 12,12 6,12 z"></path></g></g><g transform="translate(80, 10)"><rect class="lucid-LineChart-invisible" width="840" height="425"></rect></g></svg>');
		});
	});
});
