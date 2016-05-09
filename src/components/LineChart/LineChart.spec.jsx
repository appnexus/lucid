import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import assert from 'assert';

import LineChart from './LineChart';

const NO_MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };
const DATA = [
	{ x: new Date('2015-01-01T00:00:00Z'), y: 15 },
	{ x: new Date('2015-01-02T00:00:00Z'), y: 10 },
	{ x: new Date('2015-01-03T00:00:00Z'), y: 30 },
];

describeWithDOM('LineChart', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	common(LineChart, {
		getDefaultProps: () => ({
			data: [
				{x: new Date('2015-01-01T00:00:00Z'), y: 1},
				{x: new Date('2015-01-01T00:00:00Z'), y: 2},
			]
		})
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

	describe('props', () => {
		it('height and width', () => {
			wrapper = mount(
				<LineChart
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
				<LineChart
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
				<LineChart
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
				<LineChart
					data={DATA}
					xAxisHasTitle={true}
				/>
			);

			assert(wrapper.find('tspan').filterWhere(t => t.text() === 'x'), 'unable to find x title');
		});
	});
});
