// Note: these tests are basically pin tests, given that we're rendering svgs,
// these tests serve to ensure that the rendered output is exactly at the author
// intended. As a consequence, you may need to re-pin these tests if you change
// things.

import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import BarChart from './BarChart';

describe('BarChart', () => {
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
			'yAxisTooltipFormatter',
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
	});
});
