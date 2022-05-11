/* eslint-disable comma-spacing */
import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import assert from 'assert';
import * as d3Scale from 'd3-scale';

import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';
import * as chartConstants from '../../constants/charts';

import Points from './Points';
import Point from '../Point/Point';

const defaultData = [
	{ x: 'aye', y: 10, y2: 20 },
	{ x: 'bee', y: 55, y2: 35 },
	{ x: 'see', y: 100, y2: 3 },
];

const defaultXScale: any = d3Scale
	.scalePoint()
	.domain(['aye', 'bee', 'see'])
	.range([0, 100]);

const defaultYScale: any = d3Scale
	.scaleLinear()
	.domain([0, 100])
	.range([1000, 0]);

describe('Points', () => {
	common(Points, {
		exemptFunctionProps: ['xScale', 'yScale'] as any,
		getDefaultProps: () => ({
			data: [{ x: new Date('2015-01-01T00:00:00Z'), y: 1 }],
			xScale: d3Scale.scaleTime(),
			yScale: d3Scale.scaleLinear(),
		}),
	});

	describe('props', () => {
		describe('data', () => {
			it('should handle a basic data set', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Point).length, 3);
			});
		});

		describe('palette', () => {
			it('should kick in when theres no colorMap', () => {
				const palette = ['r', 'g'];
				const wrapper = shallow(
					<Points
						data={[{ x: 'one', rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('color'), 'r');
				assert.equal(wrapper.find(Point).at(1).prop('color'), 'g');
				assert.equal(wrapper.find(Point).at(2).prop('color'), 'r');
			});

			it('should be beat when theres a colorMap', () => {
				const palette = ['r', 'g'];
				const wrapper = shallow(
					<Points
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

				assert.equal(wrapper.find(Point).at(0).prop('color'), 'r');
				assert.equal(wrapper.find(Point).at(1).prop('color'), '#ABC123');
				assert.equal(wrapper.find(Point).at(2).prop('color'), 'r');
			});
		});

		describe('colorMap', () => {
			it('should pass custom colors through to Point', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						colorMap={{
							y: '#ABC333',
						}}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('color'), '#ABC333');
			});
		});

		describe('xScale', () => {
			it('should work with point scales', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 900);

				assert.equal(wrapper.find(Point).at(1).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(1).prop('y'), 449.99999999999994);

				assert.equal(wrapper.find(Point).at(2).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(2).prop('y'), 0);
			});

			it('should work with linear scales', () => {
				const xScale: any = d3Scale
					.scaleLinear()
					.domain([0, 10])
					.range([0, 100]);
				const wrapper = shallow(
					<Points
						data={[
							{ x: 2, y: 20 },
							{ x: 6, y: 50 },
						]}
						xScale={xScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('x'), 20);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 800);

				assert.equal(wrapper.find(Point).at(1).prop('x'), 60);
				assert.equal(wrapper.find(Point).at(1).prop('y'), 500);
			});
		});

		describe('yScale', () => {
			it('should work with point scales', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 900);

				assert.equal(wrapper.find(Point).at(1).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(1).prop('y'), 449.99999999999994);

				assert.equal(wrapper.find(Point).at(2).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(2).prop('y'), 0);
			});

			it('should work with time scales', () => {
				const xScale: any = d3Scale
					.scalePoint()
					.domain([
						new Date('2015-01-01T00:00:00Z') as any,
						new Date('2015-01-03T00:00:00Z') as any,
					])
					.range([0, 100]);

				const yScale: any = d3Scale
					.scaleTime()
					.domain([0, 100])
					.range([1000, 0]);

				const wrapper = shallow(
					<Points
						data={[
							{ x: new Date('2015-01-01T00:00:00Z'), y: 0 },
							{ x: new Date('2015-01-02T00:00:00Z'), y: 50 },
							{ x: new Date('2015-01-03T00:00:00Z'), y: 100 },
						]}
						xScale={xScale}
						yScale={yScale}
					/>
				);

				assert.equal(wrapper.find(Point).length, 3, 'wrong number of Point');

				assert.equal(wrapper.find(Point).at(0).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 1000);

				assert.equal(wrapper.find(Point).at(1).prop('y'), 500);

				assert.equal(wrapper.find(Point).at(2).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(2).prop('y'), 0);
			});
		});

		describe('xField', () => {
			it('should pick up an alternate xField', () => {
				const wrapper = shallow(
					<Points
						data={[
							{ axe: 'aye', y: 10 },
							{ axe: 'bee', y: 55 },
							{ axe: 'see', y: 100 },
						]}
						xScale={defaultXScale}
						yScale={defaultYScale}
						xField='axe'
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 900);

				assert.equal(wrapper.find(Point).at(1).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(1).prop('y'), 449.99999999999994);

				assert.equal(wrapper.find(Point).at(2).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(2).prop('y'), 0);
			});
		});

		describe('yFields', () => {
			it('should pickup an alternate field', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						yFields={['y2']}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 800);

				assert.equal(wrapper.find(Point).at(1).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(1).prop('y'), 650);

				assert.equal(wrapper.find(Point).at(2).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(2).prop('y'), 970);
			});

			it('should handle multiple fields', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						yFields={['y', 'y2']}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 900);

				assert.equal(wrapper.find(Point).at(1).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(1).prop('y'), 449.99999999999994);

				assert.equal(wrapper.find(Point).at(2).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(2).prop('y'), 0);

				assert.equal(wrapper.find(Point).at(3).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(3).prop('y'), 800);

				assert.equal(wrapper.find(Point).at(4).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(4).prop('y'), 650);

				assert.equal(wrapper.find(Point).at(5).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(5).prop('y'), 970);
			});
		});

		describe('colorOffset', () => {
			it('should correctly offset the palette colors', () => {
				const palette = ['r', 'g'];
				const wrapper = shallow(
					<Points
						data={[{ x: 'one', rev: 1, imp: 2, click: 3 }]}
						yFields={['rev', 'imp', 'click']}
						xScale={defaultXScale}
						yScale={defaultYScale}
						palette={palette}
						colorOffset={3}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('color'), 'g');
				assert.equal(wrapper.find(Point).at(1).prop('color'), 'r');
				assert.equal(wrapper.find(Point).at(2).prop('color'), 'g');
			});
		});

		describe('hasStroke', () => {
			it('should pass through true to Point', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						hasStroke
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('hasStroke'), true);
			});

			it('should pass through false to Point', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						hasStroke={false}
					/>
				);

				assert.equal(wrapper.find(Point).at(0).prop('hasStroke'), false);
			});
		});

		describe('isStacked', () => {
			it('should stack points accordingly', () => {
				const wrapper = shallow(
					<Points
						data={defaultData}
						xScale={defaultXScale}
						yScale={defaultYScale}
						yFields={['y', 'y2']}
						isStacked
					/>
				);

				assert.equal(wrapper.find(Point).length, 6);

				assert.equal(wrapper.find(Point).at(0).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(0).prop('y'), 902.9126213592233);

				assert.equal(wrapper.find(Point).at(1).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(1).prop('y'), 466.0194174757282);

				assert.equal(wrapper.find(Point).at(2).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(2).prop('y'), 29.126213592232997);

				assert.equal(wrapper.find(Point).at(3).prop('x'), 0);
				assert.equal(wrapper.find(Point).at(3).prop('y'), 708.7378640776699);

				assert.equal(wrapper.find(Point).at(4).prop('x'), 50);
				assert.equal(wrapper.find(Point).at(4).prop('y'), 126.21359223300976);

				assert.equal(wrapper.find(Point).at(5).prop('x'), 100);
				assert.equal(wrapper.find(Point).at(5).prop('y'), 0);
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const defaultProps = Points.defaultProps;
			const data = [{ x: 'one', y0: 4, y1: 5, y2: 6, y3: 7 }];

			beforeEach(() => {
				const props = {
					...defaultProps,
					data,
					xField: 'x-test',
					yFields: ['y0-test', 'y1-test'],
					colorOffset: 10,
					hasStroke: false,
					isStacked: true,
					palette: chartConstants.PALETTE_30,
					xScale: defaultXScale,
					yScale: defaultYScale,
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<Points {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-Points').props();
				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' is plucked from the pass through object
				// but still appears becuase is is are also directly passed on the root element as a prop
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits all the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-Points').props();
				forEach(
					[
						'palette',
						'colorMap',
						'data',
						'xScale',
						'yScale',
						'xField',
						'yFields',
						'yStackedMax',
						'colorOffset',
						'hasStroke',
						'isStacked',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});
});
