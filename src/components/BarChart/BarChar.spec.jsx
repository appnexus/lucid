import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import assert from 'assert';

import BarChart from './BarChart';

const NO_MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };
const DATA = [
	{ x: 'Monday'    , y: 1  , y2: 2}   ,
	{ x: 'Tuesday'   , y: 4  , y2: 4 }  ,
	{ x: 'Wednesday' , y: 8  , y2: 1 }  ,
	{ x: 'Thursday'  , y: 20 , y2: 15 } ,
	{ x: 'Friday'    , y: 10 , y2: 2 }  ,
];

describeWithDOM('BarChart', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	common(BarChart, {
		getDefaultProps: () => ({
			data: DATA,
		})
	});

	describe.only('render', () => {
		it('should render a basic chart', () => {
			wrapper = mount(
				<BarChart
					data={DATA}
				/>
			);

			assert.equal(wrapper.find('.lucid-Bar').length, 5, 'did not find the correct number of bars');
			assert.equal(wrapper.find('.lucid-Axis').length, 2, 'did not find the correct number of axes');
		});

		it('should render a chart with multiple series', () => {
			wrapper = mount(
				<BarChart
					data={DATA}
					yAxisFields={['y', 'y2']}
				/>
			);

			assert.equal(wrapper.find('.lucid-Bar').length, 10, 'did not find the correct number of bars');
		});

		it.skip('should render a dual axis chart', () => {
			wrapper = mount(
				<BarChart
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

	describe.skip('props', () => {
		it('height and width', () => {
			wrapper = mount(
				<BarChart
					data={DATA}
					height={100}
					width={200}
				/>
			);

			assert.equal(wrapper.find('svg').props().height, 100, 'svg had the wrong height');
			assert.equal(wrapper.find('svg').props().width, 200, 'svg had the wrong width');
		});

		it('legend', () => {
			wrapper = mount(
				<BarChart
					data={DATA}
					legent={{
						x: 'Date',
						y: 'Revenue',
					}}
					xAxisHasTitle={true}
					yAxisHasTitle={true}
				/>
			);

			assert(wrapper.find('tspan').filterWhere(t => t.text() === 'Date'), 'unable to find x title');
			assert(wrapper.find('tspan').filterWhere(t => t.text() === 'Revenue'), 'unable to find y title');
		});

		it('xAxisField', () => {
			wrapper = mount(
				<BarChart
					margin={NO_MARGIN}
					height={100}
					width={200}
					data={[
						{ startDate: new Date('2016-01-01T00:00:00Z'), y: 1 },
						{ startDate: new Date('2016-01-02T00:00:00Z'), y: 2 },
					]}
					xAxisField='startDate'
				/>
			);

			// These tests are kinda bad. Consider removing them if they cause
			// problems in the future. Since I use transforms that are specific to
			// each shape, it's a bit weird to make assertions on their location
			assert.equal(wrapper.find('.lucid-Point').length, 2, 'wrong number of points found');
			assert.equal(wrapper.find('.lucid-Point').at(0).props().transform, 'translate(-6, 44) scale(1)', 'point location was not correct');
			assert.equal(wrapper.find('.lucid-Point').at(1).props().transform, 'translate(194, -6) scale(1)', 'point location was not correct');
		});

		// it('xAxisMin', () => {});
		// it('xAxisMax', () => {});
		// it('xAxisFormatter', () => {});
		// it('xAxisTickCount', () => {});
		it('xAxisHasTitle', () => {
			wrapper = mount(
				<BarChart
					data={DATA}
					xAxisHasTitle={true}
				/>
			);

			assert(wrapper.find('tspan').filterWhere(t => t.text() === 'x'), 'unable to find x title');
		});
	});
});
