// Note: these tests are basically pin tests, given that we're rendering svgs,
// these tests serve to ensure that the rendered output is exactly at the
// author inteded. As a consequence, you may need to re-pin these tests if you
// change things.

import _, { forEach, has, identity } from 'lodash';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import LineChart from './LineChart';
import { EmptyStateWrapper } from '../EmptyStateWrapper/EmptyStateWrapper';
import * as chartConstants from '../../constants/charts';

const {
	EmptyStateWrapper: { Title, Body },
} = LineChart;

describe('LineChart', () => {
	let wrapper: any;

	const defaultData = [
		{ x: new Date('2015-01-01T00:00:00Z'), y: 1 },
		{ x: new Date('2015-01-01T00:00:00Z'), y: 2 },
	];

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	common(LineChart, {
		exemptFunctionProps: [
			'xAxisFormatter',
			'xAxisTooltipFormatter',
			'yAxisTooltipFormatter',
			'yAxisTooltipDataFormatter',
			'yAxisFormatter',
			'y2AxisFormatter',
			'y2AxisTooltipDataFormatter',
		] as any,
		getDefaultProps: () => ({
			data: defaultData,
		}),
	});

	describe('props', () => {
		describe('isLoading', () => {
			it('should show a `LoadingIndicator` if `isLoading`', () => {
				wrapper = mount(<LineChart isLoading data={[]} />);

				const loadingIndicatorWrapper = wrapper
					.find(EmptyStateWrapper)
					.find('LoadingIndicator');

				assert(loadingIndicatorWrapper.prop('isLoading'));
			});
		});

		describe('pass throughs', () => {
			const className = 'wut';

			const data = [
				{ x: new Date('2015-01-01T00:00:00-08:00'), y: 1 },
				{ x: new Date('2015-01-02T00:00:00-08:00'), y: 0 },
				{ x: new Date('2015-01-03T00:00:00-08:00'), y: 3 },
			];

			const props = {
				className: 'wut',
				height: 100,
				width: 101,
				margin: { top: 10, right: 11, bottom: 12, left: 13 },
				data,
				legend: {
					x: 'Date',
					y: 'Impressions',
				},
				isLoading: true,
				hasToolTips: true,
				hasLegend: true,
				palette: chartConstants.PALETTE_MONOCHROME_2_5,
				colorMap: { clicks: '#abc123' },
				xAxisField: 'xAxisField test',
				xAxisMin: new Date('2021-01-01T00:00:00-08:00'),
				xAxisMax: new Date('2022-01-01T00:00:00-08:00'),
				xAxisFormatter: identity,
				xAxisTooltipFormatter: identity,
				xAxisTickCount: 10,
				xAxisTicks: [
					new Date('2022-01-01T00:00:00-08:00'),
					new Date('2022-01-01T00:00:00-08:00'),
				],
				xAxisTitle: 'xAxisTitle test',
				xAxisTitleColor: chartConstants.COLOR_0,
				xAxisTextOrientation: 'vertical' as any,
				yAxisFields: ['yAxisFields1', 'yAxisFields2'],
				yAxisMin: 103,
				yAxisMax: 104,
				yAxisFormatter: identity,
				yAxisIsStacked: true,
				yAxisHasPoints: true,
				yAxisTickCount: 105,
				yAxisTitle: 'yAxisTitle test',
				yAxisTitleColor: chartConstants.COLOR_2,
				yAxisTooltipFormatter: identity,
				yAxisTooltipDataFormatter: identity,
				yAxisColorOffset: 106,
				y2AxisFields: ['y2AxisFields_1 test', 'y2AxisFields_2 test'],
				y2AxisMin: 106,
				y2AxisMax: 107,
				y2AxisFormatter: identity,
				y2AxisTooltipDataFormatter: identity,
				y2AxisIsStacked: true,
				y2AxisHasPoints: true,
				y2AxisTickCount: 108,
				y2AxisTitle: 'y2AxisTitle test',
				y2AxisTitleColor: chartConstants.COLOR_3,
				y2AxisColorOffset: 109,
				yAxisTextOrientation: 'horizontal' as any,
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
				...{
					foo: 1,
					bar: 2,
				},
			};

			it('passes through all props not defined in `propTypes` to the native input element.', () => {
				wrapper = shallow(<LineChart {...props} />);

				const inputProps = wrapper.find('.lucid-LineChart').props();

				// 'className', 'width' and 'height'
				// all appear becuase they are directly passed on the root element as a prop
				// It should pass `foo` and `bar` through to the native svg.
				_.forEach(
					['foo', 'bar', 'className', 'data-testid', 'height', 'width'],
					(prop) => {
						expect(has(inputProps, prop)).toBe(true);
					}
				);
			});
			it('omits the component specific props defined in `propTypes` (plus, in addition, `children`, `initialState`, and `callbackId`) from the root element', () => {
				wrapper = shallow(<LineChart {...props} />);

				const inputProps = wrapper.find('.lucid-LineChart').props();

				forEach(
					[
						'margin',
						'data',
						'legend',
						'isLoading',
						'hasToolTips',
						'hasLegend',
						'palette',
						'colorMap',
						'xAxisField',
						'xAxisMin',
						'xAxisMax',
						'xAxisFormatter',
						'xAxisTooltipFormatter',
						'xAxisTickCount',
						'xAxisTicks',
						'xAxisTitle',
						'xAxisTitleColor',
						'xAxisTextOrientation',
						'yAxisFields',
						'yAxisMin',
						'yAxisMax',
						'yAxisFormatter',
						'yAxisIsStacked',
						'yAxisHasPoints',
						'yAxisTickCount',
						'yAxisTitle',
						'yAxisTitleColor',
						'yAxisTooltipFormatter',
						'yAxisTooltipDataFormatter',
						'yAxisColorOffset',
						'y2AxisFields',
						'y2AxisMin',
						'y2AxisMax',
						'y2AxisFormatter',
						'y2AxisTooltipDataFormatter',
						'y2AxisIsStacked',
						'y2AxisHasPoints',
						'y2AxisTickCount',
						'y2AxisTitle',
						'y2AxisTitleColor',
						'y2AxisColorOffset',
						'yAxisTextOrientation',
						'callbackId',
						'initialState',
					],
					(prop) => {
						expect(has(inputProps, prop)).toBe(false);
					}
				);
			});
		});
	});

	describe('child components', () => {
		describe('EmptyStateWrapper Title', () => {
			it('should render the message title element', () => {
				const titleText = 'Here is the Title Text';
				wrapper = mount(
					<LineChart data={[]}>
						<EmptyStateWrapper>
							<Title>{titleText}</Title>
						</EmptyStateWrapper>
					</LineChart>
				);

				const messageTitleWrapper = wrapper
					.find(EmptyStateWrapper)
					.find('.lucid-EmptyStateWrapper-message-title');

				assert.equal(
					messageTitleWrapper.text(),
					titleText,
					'must contain the title text'
				);
			});
		});

		describe('EmptyStateWrapper Body', () => {
			it('should render the message body element', () => {
				const bodyElement = (
					<div className='parent-div'>
						<div className='nested-div' />
					</div>
				);
				wrapper = mount(
					<LineChart data={[]}>
						<EmptyStateWrapper>
							<Body>{bodyElement}</Body>
						</EmptyStateWrapper>
					</LineChart>
				);

				const messageBodyWrapper = wrapper.find(EmptyStateWrapper);

				assert(
					messageBodyWrapper.contains(bodyElement),
					'must contain the body element'
				);
			});
		});
	});

	describe('render', () => {
		it('should render a single axis chart', () => {
			wrapper = mount(
				<LineChart
					data={[
						{ x: new Date(), y: 1 },
						{ x: new Date(), y: 2 },
						{ x: new Date(), y: 3 },
					]}
				/>
			);

			assert.equal(
				wrapper.find('.lucid-Point').length,
				3,
				'did not find the correct number of points'
			);
		});

		it('should render a single axis chart with multiple series', () => {
			wrapper = mount(
				<LineChart
					data={[
						{ x: new Date(), y: 1, y2: 1 },
						{ x: new Date(), y: 2, y2: 1 },
						{ x: new Date(), y: 3, y2: 1 },
					]}
					yAxisFields={['y', 'y2']}
				/>
			);

			assert.equal(
				wrapper.find('.lucid-Line').length,
				2,
				'did not find the correct number of lines'
			);
		});

		it('should render a dual axis chart', () => {
			wrapper = mount(
				<LineChart
					data={[
						{ x: new Date(), y: 1, y2: 1 },
						{ x: new Date(), y: 2, y2: 1 },
						{ x: new Date(), y: 3, y2: 1 },
					]}
					yAxisFields={['y']}
					y2AxisFields={['y2']}
				/>
			);

			assert.equal(
				wrapper.find('.lucid-Axis').length,
				3,
				'did not find the correct number of axes'
			);
		});
	});
});
