/* eslint-disable comma-spacing */

import React from 'react';
import assert from 'assert';
import * as d3Scale from 'd3-scale';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import Lines from './Lines';
import Line from '../Line/Line';

const defaultData = [
	{ x: 0, y: 10, y2: 20 },
	{ x: 5, y: 55, y2: 35 },
	{ x: 10, y: 100, y2: 0 },
];

// The scales are functions to guard against inadvertent scale mutation
const defaultXScale: any = d3Scale
	.scaleLinear()
	.domain([0, 10])
	.range([0, 100]);

const defaultYScale: any = d3Scale
	.scaleLinear()
	.domain([0, 100])
	.range([1000, 0]);

describe('Lines', () => {
	common(Lines, {
		exemptFunctionProps: ['xScale', 'yScale'] as any,
		getDefaultProps: () => ({
			data: [{ x: new Date('2015-01-01T00:00:00Z'), y: 1 }],
			xScale: d3Scale.scaleTime(),
			yScale: d3Scale.scaleLinear(),
		}),
	});

	describe('props', () => {
		describe('palette', () => {
			it('should kick in when theres no colorMap', () => {
				const palette = ['bling', 'blang'];
				const wrapper = shallow(
					<Lines
						data={[{ x: 1, rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('color'), 'bling');
				assert.equal(wrapper.find(Line).at(1).prop('color'), 'blang');
				assert.equal(wrapper.find(Line).at(2).prop('color'), 'bling');
			});

			it('should be beat when theres a colorMap', () => {
				const palette = ['bling', 'blang'];
				const wrapper = shallow(
					<Lines
						data={[{ x: 1, rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
						colorMap={{
							rev: 'wat',
						}}
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('color'), 'wat');
				assert.equal(wrapper.find(Line).at(1).prop('color'), 'blang');
				assert.equal(wrapper.find(Line).at(2).prop('color'), 'bling');
			});
		});

		describe('colorMap', () => {
			it('should pass custom colors through to Line', () => {
				const wrapper = shallow(
					<Lines
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						colorMap={{
							y: '#ABC333',
						}}
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('color'), '#ABC333');
			});
		});

		describe('data', () => {
			it('should handle a basic data set', () => {
				const wrapper = shallow(
					<Lines
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Line).length, 1);
			});
		});

		describe('xScale', () => {
			it('should work with linear scales', () => {
				const wrapper = shallow(
					<Lines
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Line).length, 1, 'wrong number of Line');
				assert.equal(
					wrapper.find(Line).at(0).prop('d'),
					'M0,900L50,449.99999999999994L100,0L100,0L50,449.99999999999994L0,900Z'
				);
			});

			it('should work with time scales', () => {
				const xScale = d3Scale
					.scaleTime()
					.domain([
						new Date('2015-01-01T00:00:00Z'),
						new Date('2015-01-02T00:00:00Z'),
					])
					.range([0, 500]);
				const wrapper = shallow(
					<Lines
						data={[
							{ x: new Date('2015-01-01T00:00:00Z'), y: 50 },
							{ x: new Date('2015-01-02T00:00:00Z'), y: 60 },
						]}
						xScale={xScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Line).length, 1, 'wrong number of Line');
				assert.equal(
					wrapper.find(Line).at(0).prop('d'),
					'M0,500L500,400L500,400L0,500Z'
				);
			});
		});

		describe('yScale', () => {
			it('should work with time scales', () => {
				const yScale: any = d3Scale
					.scaleTime()
					.domain([
						new Date('2015-01-01T00:00:00Z'),
						new Date('2015-01-02T00:00:00Z'),
					])
					.range([0, 500]);
				const wrapper = shallow(
					<Lines
						data={[
							{ y: new Date('2015-01-01T00:00:00Z'), x: 5 },
							{ y: new Date('2015-01-02T00:00:00Z'), x: 6 },
						]}
						xScale={defaultXScale}
						yScale={yScale}
					/>
				);

				assert.equal(wrapper.find(Line).length, 1, 'wrong number of Line');
				assert.equal(
					wrapper.find(Line).at(0).prop('d'),
					'M50,0L60,500L60,500L50,0Z'
				);
			});
		});

		describe('xField', () => {
			it('should pickup alternate xFields', () => {
				const wrapper = shallow(
					<Lines
						data={[
							{ axe: 1, y: 3 },
							{ axe: 2, y: 2 },
							{ axe: 3, y: 1 },
						]}
						xField='axe'
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Line).length, 1, 'wrong number of Line');
				assert.equal(
					wrapper.find(Line).at(0).prop('d'),
					'M10,970L20,980L30,990L30,990L20,980L10,970Z'
				);
			});
		});

		describe('yFields', () => {
			it('should pickup an alternate field', () => {
				const wrapper = shallow(
					<Lines
						data={defaultData}
						yFields={['y2']}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(
					wrapper.find(Line).at(0).prop('d'),
					'M0,800L50,650L100,1000L100,1000L50,650L0,800Z'
				);
			});

			it('should handle multiple fields', () => {
				const wrapper = shallow(
					<Lines
						data={defaultData}
						yFields={['y', 'y2']}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(
					wrapper.find(Line).at(0).prop('d'),
					'M0,900L50,449.99999999999994L100,0L100,0L50,449.99999999999994L0,900Z'
				);
				assert.equal(
					wrapper.find(Line).at(1).prop('d'),
					'M0,800L50,650L100,1000L100,1000L50,650L0,800Z'
				);
			});
		});

		describe('isStacked', () => {
			it('should stack', () => {
				const wrapper = shallow(
					<Lines
						data={defaultData}
						yFields={['y', 'y2']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						isStacked
					/>
				);

				assert.equal(
					wrapper.find(Line).at(0).prop('d'),
					'M0,1000L50,1000L100,1000L100,0L50,449.99999999999994L0,900Z'
				);
				assert.equal(
					wrapper.find(Line).at(1).prop('d'),
					'M0,900L50,449.99999999999994L100,0L100,0L50,99.99999999999997L0,700Z'
				);
			});
		});

		describe('colorOffset', () => {
			it('should correctly offset the palette colors', () => {
				const palette = ['bing', 'bong'];
				const wrapper = shallow(
					<Lines
						data={[{ x: 1, rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
						colorOffset={1}
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('color'), 'bong');
				assert.equal(wrapper.find(Line).at(1).prop('color'), 'bing');
				assert.equal(wrapper.find(Line).at(2).prop('color'), 'bong');
			});
		});
	});
});
