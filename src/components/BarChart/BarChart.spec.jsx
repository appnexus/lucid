// Note: these tests are basically pin tests, given that we're rendering svgs,
// these tests serve to ensure that the rendered output is exactly at the author
// intended. As a consequence, you may need to re-pin these tests if you change
// things.

import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import assert from 'assert';

import BarChart from './BarChart';

describeWithDOM('BarChart', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	common(BarChart, {
		exemptFunctionProps: [
			'xAxisFormatter',
			'yAxisFormatter',
		],
		getDefaultProps: () => ({
			data: [
				{ x: 'Monday'    , y: 1  , y2: 2}   ,
				{ x: 'Tuesday'   , y: 4  , y2: 4 }  ,
				{ x: 'Wednesday' , y: 8  , y2: 1 }  ,
				{ x: 'Thursday'  , y: 20 , y2: 15 } ,
				{ x: 'Friday'    , y: 10 , y2: 2 }  ,
			],
		}),
	});

	describe('render', () => {
		it('should render a basic chart', () => {
			wrapper = mount(
				<BarChart
					data={[
						{ x: 'Monday'    , y: 1  , y2: 2}   ,
						{ x: 'Tuesday'   , y: 4  , y2: 4 }  ,
						{ x: 'Wednesday' , y: 8  , y2: 1 }  ,
						{ x: 'Thursday'  , y: 20 , y2: 15 } ,
						{ x: 'Friday'    , y: 10 , y2: 2 }  ,
					]}
				/>
			);

			assert.equal(wrapper.find('.lucid-Bar').length, 5, 'did not find the correct number of bars');
			assert.equal(wrapper.find('.lucid-Axis').length, 2, 'did not find the correct number of axes');
		});

		it('should render a chart with multiple series', () => {
			wrapper = mount(
				<BarChart
					data={[
						{ x: 'Monday'    , y: 1  , y2: 2}   ,
						{ x: 'Tuesday'   , y: 4  , y2: 4 }  ,
						{ x: 'Wednesday' , y: 8  , y2: 1 }  ,
						{ x: 'Thursday'  , y: 20 , y2: 15 } ,
						{ x: 'Friday'    , y: 10 , y2: 2 }  ,
					]}
					yAxisFields={['y', 'y2']}
				/>
			);

			assert.equal(wrapper.find('.lucid-Bar').length, 10, 'did not find the correct number of bars');
		});

		it('should have the correct html', () => {
			wrapper = mount(
				<BarChart
					height={500}
					width={1000}
					margins={{
						top: 50,
						right: 50,
						bottom: 50,
						left: 50,
					}}
					data={[
						{date: '2015-01-01', rev: 100, imps: 1000},
						{date: '2015-01-02', rev: 89, imps: 2200},
						{date: '2015-01-03', rev: 95, imps: 3305},
					]}

					xAxisField='date'
					xAxisTitle='Date'
					xAxisTickCount={2}
					xAxisFormatter={() => 'x axis tick'}

					yAxisFields={['rev', 'imps']}
					yAxisTitle='Metrics'
					yAxisTickCount={4}
					yAxisFormatter={() => 'y axis tick'}
				/>
			);

			assert.equal(wrapper.html(), '<svg class="lucid-BarChart" width="1000" height="500"><g transform="translate(80, 450)"><g class="lucid-Axis"><path class="lucid-Axis-domain" d="M0,0V0H900V0"></path><g transform="translate(206.75675675675674, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">2015-01-01</text></g><g transform="translate(693.2432432432432, 0)"><line class="lucid-Axis-tick" x2="0" y2="6"></line><text class="lucid-Axis-tick-text" x="0" y="9" dy=".71em" style="text-anchor:middle;">2015-01-03</text></g></g></g><g transform="translate(80, 450)"><text style="fill:#000;" class="lucid-AxisLabel" x="450" y="50" dy="-.32em" transform="">Date</text></g><g transform="translate(80, 10)"><g class="lucid-Axis"><path class="lucid-Axis-domain" d="M-6,440H0V0H-6"></path><g transform="translate(0, 440)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g><g transform="translate(0, 306.86838124054464)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g><g transform="translate(0, 173.73676248108927)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g><g transform="translate(0, 40.60514372163391)"><line class="lucid-Axis-tick" x2="-6" y2="0"></line><text class="lucid-Axis-tick-text" x="-9" y="0" dy=".32em" style="text-anchor:end;">y axis tick</text></g></g></g><g transform="translate(0, 10)"><text style="fill:#000;" class="lucid-AxisLabel" x="-220" y="0" dy="1em" transform="rotate(-90)">Metrics</text></g><g transform="translate(80, 10)"><g class="lucid-Bars"><g><rect class="lucid-Bar lucid-Bar-color-chart-0" x="121.62162162162161" y="426.6868381240545" height="13.313161875945525" width="85"></rect><rect class="lucid-Bar lucid-Bar-color-chart-1" x="206.6216216216216" y="306.86838124054464" height="133.13161875945536" width="85"></rect><g class="lucid-ContextMenu lucid-ToolTip"><rect class="lucid-Bars-tooltip-hover-zone" height="133.13161875945536" width="170.27027027027026" x="121.62162162162161" y="306.86838124054464"></rect></g></g><g><rect class="lucid-Bar lucid-Bar-color-chart-0" x="364.86486486486484" y="428.15128593040845" height="11.848714069591551" width="85"></rect><rect class="lucid-Bar lucid-Bar-color-chart-1" x="449.86486486486484" y="147.11043872919822" height="292.8895612708018" width="85"></rect><g class="lucid-ContextMenu lucid-ToolTip"><rect class="lucid-Bars-tooltip-hover-zone" height="292.8895612708018" width="170.27027027027026" x="364.86486486486484" y="147.11043872919822"></rect></g></g><g><rect class="lucid-Bar lucid-Bar-color-chart-0" x="608.1081081081081" y="427.35249621785175" height="12.647503782148249" width="85"></rect><rect class="lucid-Bar lucid-Bar-color-chart-1" x="693.1081081081081" y="0" height="440" width="85"></rect><g class="lucid-ContextMenu lucid-ToolTip"><rect class="lucid-Bars-tooltip-hover-zone" height="440" width="170.27027027027026" x="608.1081081081081" y="0"></rect></g></g></g></g></svg>');
		});
	});
});

