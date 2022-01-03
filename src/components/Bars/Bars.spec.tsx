/* eslint-disable comma-spacing */

import React from 'react';
import assert from 'assert';
import * as d3Scale from 'd3-scale';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import Bars, { PureToolTip } from './Bars';
import Bar from '../Bar/Bar';
import Legend from '../Legend/Legend';
import { ToolTipDumb as ToolTip } from '../ToolTip/ToolTip';

const defaultData = [
	{ x: 'aye', y: 10, y2: 20 },
	{ x: 'bee', y: 55, y2: 35 },
	{ x: 'see', y: 100, y2: 3 },
];

const defaultXScale = d3Scale
	.scaleBand()
	.domain(['aye', 'bee', 'see'])
	.range([0, 100]);

const defaultYScale = d3Scale.scaleLinear().domain([0, 100]).range([1000, 0]);

describe('Bars', () => {
	common(Bars, {
		exemptFunctionProps: [
			'xScale',
			'yScale',
			'xFormatter',
			'yFormatter',
			'yTooltipFormatter',
			'renderTooltipBody',
		] as any,
		getDefaultProps: () => ({
			data: defaultData,
			xScale: defaultXScale,
			yScale: defaultYScale,
		}),
	});

	describe('props', () => {
		describe('data', () => {
			it('should handle a basic data set', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 3);
			});
		});

		describe('legend', () => {
			it('should display the correct legend entries based on the legend', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						hasToolTips
						legend={{
							y: 'Foo',
						}}
					/>
				);

				assert(
					wrapper.find(PureToolTip).at(0).shallow().find(Legend.Item).text(),
					'Foo: 10'
				);
				assert(
					wrapper.find(PureToolTip).at(1).shallow().find(Legend.Item).text(),
					'Foo: 55'
				);
				assert(
					wrapper.find(PureToolTip).at(2).shallow().find(Legend.Item).text(),
					'Foo: 90'
				);
			});
		});

		describe('palette', () => {
			it('should kick in when theres no colorMap', () => {
				const palette = ['r', 'g'];
				const wrapper = shallow(
					<Bars
						data={[{ x: 'one', rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).at(0).prop('color'), 'r');
				assert.strictEqual(wrapper.find(Bar).at(1).prop('color'), 'g');
				assert.strictEqual(wrapper.find(Bar).at(2).prop('color'), 'r');
			});

			it('should be beat when theres a colorMap', () => {
				const palette = ['r', 'g'];
				const wrapper = shallow(
					<Bars
						data={[{ x: 'one', rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
						colorMap={{
							imp: '#ABC123',
						}}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).at(0).prop('color'), 'r');
				assert.strictEqual(wrapper.find(Bar).at(1).prop('color'), '#ABC123');
				assert.strictEqual(wrapper.find(Bar).at(2).prop('color'), 'r');
			});
		});

		describe('colorMap', () => {
			it('should pass custom colors through to Bar', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						colorMap={{
							y: '#ABC333',
						}}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).at(0).prop('color'), '#ABC333');
			});
		});

		describe('xScale', () => {
			it('should work with band scales', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 3, 'wrong number of Bar');
				assert.strictEqual(wrapper.find(Bar).at(0).prop('height'), 100);
				assert.strictEqual(
					wrapper.find(Bar).at(1).prop('height'),
					550.00000000000001
				);
				assert.strictEqual(wrapper.find(Bar).at(2).prop('height'), 1000);
			});
		});

		describe('xField', () => {
			it('should pickup alternate xFields', () => {
				const wrapper = shallow(
					<Bars
						data={[
							{ axe: 'one', y: 0 },
							{ axe: 'two', y: 50 },
							{ axe: 'three', y: 100 },
						]}
						xField='axe'
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 3, 'wrong number of Bar');
				assert.strictEqual(wrapper.find(Bar).at(0).prop('height'), 0);
				assert.strictEqual(wrapper.find(Bar).at(1).prop('height'), 500);
				assert.strictEqual(wrapper.find(Bar).at(2).prop('height'), 1000);
			});
		});

		describe('xFormatter', () => {
			it('should format the x field using the provided function', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						hasToolTips
						xFormatter={(str: any) => str.toUpperCase()}
					/>
				).find(PureToolTip);

				assert.strictEqual(
					wrapper.at(0).shallow().find(ToolTip.Title).prop('children'),
					'AYE'
				);
				assert.strictEqual(
					wrapper.at(1).shallow().find(ToolTip.Title).prop('children'),
					'BEE'
				);
				assert.strictEqual(
					wrapper.at(2).shallow().find(ToolTip.Title).prop('children'),
					'SEE'
				);
			});

			it('should have access to the full datum', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						hasToolTips
						xFormatter={
							((str: any, d: any) => `${str.toUpperCase()} ${d.y2}`) as any
						}
					/>
				).find(PureToolTip);

				assert.strictEqual(
					wrapper.at(0).shallow().find(ToolTip.Title).prop('children'),
					'AYE 20'
				);
				assert.strictEqual(
					wrapper.at(1).shallow().find(ToolTip.Title).prop('children'),
					'BEE 35'
				);
				assert.strictEqual(
					wrapper.at(2).shallow().find(ToolTip.Title).prop('children'),
					'SEE 3'
				);
			});
		});

		describe('yScale', () => {
			it('should work with linear scales', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 3, 'wrong number of Bar');
				assert.strictEqual(wrapper.find(Bar).at(0).prop('height'), 100);
				assert.strictEqual(
					wrapper.find(Bar).at(1).prop('height'),
					550.00000000000001
				);
				assert.strictEqual(wrapper.find(Bar).at(2).prop('height'), 1000);
			});

			it('should work with time scales', () => {
				const xScale = d3Scale
					.scaleBand()
					.domain([
						new Date('2015-01-01T00:00:00Z'),
						new Date('2015-01-03T00:00:00Z'),
					] as any)
					.range([0, 100]);

				const yScale: any = d3Scale
					.scaleTime()
					.domain([0, 100])
					.range([1000, 0]);

				const wrapper = shallow(
					<Bars
						data={[
							{ x: new Date('2015-01-01T00:00:00Z'), y: 0 },
							{ x: new Date('2015-01-02T00:00:00Z'), y: 50 },
							{ x: new Date('2015-01-03T00:00:00Z'), y: 100 },
						]}
						xScale={xScale}
						yScale={yScale}
						xFormatter={(d) => d.toISOString()}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 3, 'wrong number of Bar');

				assert.strictEqual(wrapper.find(Bar).at(0).prop('width'), 50);
				assert.strictEqual(wrapper.find(Bar).at(0).prop('height'), 0);

				assert.strictEqual(wrapper.find(Bar).at(1).prop('width'), 50);
				assert.strictEqual(wrapper.find(Bar).at(1).prop('height'), 500);

				assert.strictEqual(wrapper.find(Bar).at(2).prop('width'), 50);
				assert.strictEqual(wrapper.find(Bar).at(2).prop('height'), 1000);
			});
		});

		describe('yFields', () => {
			it('should pickup an alternate field', () => {
				const wrapper = shallow(
					<Bars
						data={[
							{ x: 'one', why: 0 },
							{ x: 'two', why: 50 },
							{ x: 'three', why: 100 },
						]}
						yFields={['why']}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 3, 'wrong number of Bar');
				assert.strictEqual(wrapper.find(Bar).at(0).prop('height'), 0);
				assert.strictEqual(wrapper.find(Bar).at(1).prop('height'), 500);
				assert.strictEqual(wrapper.find(Bar).at(2).prop('height'), 1000);
			});

			it('should handle multiple fields', () => {
				const wrapper = shallow(
					<Bars
						data={[
							{ x: 'one', why: 0, not: 100 },
							{ x: 'two', why: 50, not: 50 },
							{ x: 'three', why: 100, not: 0 },
						]}
						yFields={['why', 'not']}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 6, 'wrong number of Bar');
				assert.strictEqual(wrapper.find(Bar).at(0).prop('width'), 16);
				assert.strictEqual(wrapper.find(Bar).at(0).prop('height'), 0);
				assert.strictEqual(wrapper.find(Bar).at(1).prop('height'), 1000);

				assert.strictEqual(wrapper.find(Bar).at(2).prop('height'), 500);
				assert.strictEqual(wrapper.find(Bar).at(3).prop('height'), 500);

				assert.strictEqual(wrapper.find(Bar).at(4).prop('height'), 1000);
				assert.strictEqual(wrapper.find(Bar).at(5).prop('height'), 0);
			});
		});

		describe('yFormatter', () => {
			it('should format the y field using the provided function', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						hasToolTips
						xFormatter={(str: any) => str.toUpperCase()}
					/>
				).find(PureToolTip);

				assert.strictEqual(
					wrapper.at(0).shallow().find(ToolTip.Title).prop('children'),
					'AYE'
				);
				assert.strictEqual(
					wrapper.at(1).shallow().find(ToolTip.Title).prop('children'),
					'BEE'
				);
				assert.strictEqual(
					wrapper.at(2).shallow().find(ToolTip.Title).prop('children'),
					'SEE'
				);
			});
		});

		describe('isStacked', () => {
			it('should stack the bars accordingly', () => {
				const wrapper = shallow(
					<Bars
						data={[
							{ x: 'one', why: 0, not: 100 },
							{ x: 'two', why: 50, not: 50 },
							{ x: 'three', why: 100, not: 0 },
						]}
						yFields={['why', 'not']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						isStacked
					/>
				);

				assert.strictEqual(wrapper.find(Bar).length, 6, 'wrong number of Bar');
				assert.strictEqual(
					wrapper.find(Bar).at(0).prop('width'),
					33.333333333333336
				);
				assert.strictEqual(wrapper.find(Bar).at(0).prop('height'), 0);
				assert.strictEqual(wrapper.find(Bar).at(1).prop('height'), 1000);

				assert.strictEqual(wrapper.find(Bar).at(2).prop('height'), 500);
				assert.strictEqual(wrapper.find(Bar).at(3).prop('height'), 500);

				assert.strictEqual(wrapper.find(Bar).at(4).prop('height'), 1000);
				assert.strictEqual(wrapper.find(Bar).at(5).prop('height'), 0);
			});
		});

		describe('colorOffset', () => {
			it('should correctly offset the palette colors', () => {
				const palette = ['r', 'g'];
				const wrapper = shallow(
					<Bars
						data={[{ x: 'one', rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
						colorOffset={1}
					/>
				);

				assert.strictEqual(wrapper.find(Bar).at(0).prop('color'), 'g');
				assert.strictEqual(wrapper.find(Bar).at(1).prop('color'), 'r');
				assert.strictEqual(wrapper.find(Bar).at(2).prop('color'), 'g');
			});
		});

		describe('renderTooltipBody', () => {
			it('should format the whole tooltip body', () => {
				const wrapper = shallow(
					<Bars
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						hasToolTips
						renderTooltipBody={
							((dataPoint: any, data: any) => dataPoint.x.toUpperCase()) as any
						}
					/>
				);
				const toolTip = wrapper.find(PureToolTip);
				assert.strictEqual(
					toolTip.at(0).shallow().find(ToolTip.Body).prop('children'),
					'AYE'
				);
				assert.strictEqual(
					toolTip.at(1).shallow().find(ToolTip.Body).prop('children'),
					'BEE'
				);
				assert.strictEqual(
					toolTip.at(2).shallow().find(ToolTip.Body).prop('children'),
					'SEE'
				);
			});
		});
	});

	describe('tooltips', () => {
		it('should show the tooltip', () => {
			const wrapper = shallow(
				<Bars
					data={defaultData}
					xScale={defaultXScale}
					yScale={defaultYScale}
					hasToolTips
				/>
			);

			wrapper
				.find(PureToolTip)
				.forEach((node) => expect(node.prop('isExpanded')).toBe(false));

			wrapper.setState({ hoveringSeriesIndex: 0 });

			const toolTips = wrapper.find(PureToolTip);

			expect(toolTips.first().prop('isExpanded')).toBe(true);
			expect(toolTips.at(1).prop('isExpanded')).toBe(false);
			expect(toolTips.at(2).prop('isExpanded')).toBe(false);
		});

		it('should not show tooltips with `hasToolTips` = false', () => {
			const wrapper = shallow(
				<Bars
					data={defaultData}
					xScale={defaultXScale}
					yScale={defaultYScale}
					hasToolTips={false}
				/>
			);

			wrapper
				.find(PureToolTip)
				.forEach((node) => expect(node.prop('isExpanded')).toBe(false));

			wrapper.setState({ hoveringSeriesIndex: 0 });

			wrapper
				.find(PureToolTip)
				.forEach((node) => expect(node.prop('isExpanded')).toBe(false));
		});
	});
});
