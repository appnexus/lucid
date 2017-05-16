import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps, getFirst } from '../../util/component-types';
import { maxByFields, maxByFieldsStacked } from '../../util/chart-helpers';
import * as d3Scale from 'd3-scale';
import * as chartConstants from '../../constants/charts';

import Axis from '../Axis/Axis';
import AxisLabel from '../AxisLabel/AxisLabel';
import Bars from '../Bars/Bars';
import ContextMenu from '../ContextMenu/ContextMenu';
import Legend from '../Legend/Legend';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';

const cx = lucidClassNames.bind('&-BarChart');

const {
	arrayOf,
	func,
	number,
	object,
	shape,
	string,
	array,
	bool,
	oneOfType,
} = PropTypes;

/**
 * {"categories": ["visualizations", "charts"], "madeFrom": ["ContextMenu", "ToolTip"]}
 *
 * Bar charts are great for showing data that fits neatly in to "buckets". The
 * x axis data must be strings, and the y axis data must be numeric.
 */
const BarChart = createClass({
	displayName: 'BarChart',

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Height of the chart.
		 */
		height: number,
		/**
		 * Width of the chart.
		 */
		width: number,
		/**
		 * An object defining the margins of the chart. These margins typically
		 * contain the axis and labels.
		 */
		margin: shape({
			top: number,
			right: number,
			bottom: number,
			left: number,
		}),
		/**
		 * Data for the chart. E.g.
		 *
		 *     [
		 *       { x: 'Monday'    , y: 1 } ,
		 *       { x: 'Tuesday'   , y: 2 } ,
		 *       { x: 'Wednesday' , y: 3 } ,
		 *       { x: 'Thursday'  , y: 2 } ,
		 *       { x: 'Friday'    , y: 5 } ,
		 *     ]
		 */
		data: arrayOf(object),
		/**
		 * An object with human readable names for fields that will be used for
		 * legends and tooltips. E.g:
		 *
		 *     {
		 *       x: 'Date',
		 *       y: 'Impressions',
		 *     }
		 *
		 */
		legend: object,
		/**
		 * Controls the visibility of the `LoadingMessage`.
		 */
		isLoading: bool,
		/**
		 * Show tool tips on hover.
		 */
		hasToolTips: bool,
		/**
		 * Show a legend at the bottom of the chart.
		 */
		hasLegend: bool,
		/**
		 * Takes one of the palettes exported from `lucid.chartConstants`.
		 * Available palettes:
		 *
		 * - `PALETTE_6` (default)
		 * - `PALETTE_30`
		 * - `PALETTE_MONOCHROME_0_5`
		 * - `PALETTE_MONOCHROME_1_5`
		 * - `PALETTE_MONOCHROME_2_5`
		 * - `PALETTE_MONOCHROME_3_5`
		 * - `PALETTE_MONOCHROME_4_5`
		 * - `PALETTE_MONOCHROME_5_5`
		 *
		 */
		palette: arrayOf(string),
		/**
		 * You can pass in an object if you want to map x values to
		 * `lucid.chartConstants` or custom colors:
		 *
		 *     {
		 *       'imps': COLOR_0,
		 *       'rev': COLOR_3,
		 *       'clicks': '#abc123',
		 *     }
		 */
		colorMap: object,

		/**
		 * The field we should look up your x data by. Your actual x data must be
		 * strings.
		 */
		xAxisField: string,
		/**
		 * There are some cases where you need to only show a "sampling" of ticks
		 * on the x axis. This number will control that.
		 */
		xAxisTickCount: number,
		/**
		 * An optional function used to format your x axis data. If you don't
		 * provide anything, we'll use an identity function.
		 */
		xAxisFormatter: func,
		/**
		 * Set a title for the x axis.
		 */
		xAxisTitle: string,
		/**
		 * Set a color for the x axis title. Use the color constants exported off
		 * `lucid.chartConstants`. E.g.:
		 *
		 * - `COLOR_0`
		 * - `COLOR_GOOD`
		 * - `'#123abc'` // custom color hex
		 *
		 * `number` is supported only for backwards compatability.
		 */
		xAxisTitleColor: oneOfType([number, string]),

		/**
		 * An array of your y axis fields. Typically this will just be a single
		 * item unless you need to display grouped or stacked bars. The order of
		 * the array determines the series order in the chart.
		 */
		yAxisFields: array,
		/**
		 * The minimum number the y axis should display. Typically this
		 * should be be `0`.
		 */
		yAxisMin: number,
		/**
		 * The maximum number the y axis should display. This should almost always
		 * be the largest number from your dataset.
		 */
		yAxisMax: number,
		/**
		 * An optional function used to format your y axis data. If you don't
		 * provide anything, we use the default D3 number formatter.
		 */
		yAxisFormatter: func,
		/**
		 * Stack the y axis data instead of showing it as groups. This is only
		 * useful if you have multiple `yAxisFields`. Stacking will cause the chart
		 * to be aggregated by sum.
		 */
		yAxisIsStacked: bool,
		/**
		 * There are some cases where you need to only show a "sampling" of ticks
		 * on the y axis. This number will control that.
		 */
		yAxisTickCount: number,
		/**
		 * Set a title for the y axis.
		 */
		yAxisTitle: string,
		/**
		 * Set a color for the y axis title. Use the color constants exported off
		 * `lucid.chartConstants`. E.g.:
		 *
		 * - `COLOR_0`
		 * - `COLOR_GOOD`
		 * - `'#123abc'` // custom color hex
		 *
		 * `number` is supported only for backwards compatability.
		 */
		yAxisTitleColor: oneOfType([number, string]),
		/**
		 * An optional function used to format your y axis titles and data in the
		 * tooltips. The first value is the name of your y field, the second value
		 * is your post-formatted y value, and the third value is your non-formatted
		 * y-value.
		 *
		 * Signature: `(yField, yValueFormatted, yValue) => {}`
		 */
		yAxisTooltipFormatter: func,
		/**
		 * An optional function used to format data in the tooltips.
		 */
		yAxisTooltipDataFormatter: func,
	},

	statics: {
		PADDING: 0.05,
		PADDING_GROUPED_OR_STACKED: 0.3,
		MARGIN: {
			top: 10,
			right: 20,
			bottom: 50,
			left: 80,
		},
	},

	getDefaultProps() {
		return {
			height: 400,
			width: 1000,
			// duplicated because `statics` aren't available during getDefaultProps
			margin: {
				top: 10,
				right: 20,
				bottom: 50,
				left: 80,
			},
			palette: chartConstants.PALETTE_6,
			hasToolTips: true,
			hasLegend: false,

			xAxisField: 'x',
			xAxisTickCount: null,
			xAxisTitle: null,
			xAxisTitleColor: '#000',
			xAxisFormatter: _.identity,

			yAxisFields: ['y'],
			yAxisTickCount: null,
			yAxisIsStacked: false,
			yAxisMin: 0,
			yAxisTitle: null,
			yAxisTitleColor: '#000',
			yAxisTooltipFormatter: (yField, yValueFormatted) =>
				`${yField}: ${yValueFormatted}`,
		};
	},

	components: {
		/**
		 * Renders wrapper when the data table has no data.
		 */
		EmptyStateWrapper: EmptyStateWrapper,
	},

	render() {
		const {
			className,
			height,
			width,
			margin: marginOriginal,
			data,
			legend,
			isLoading,
			hasToolTips,
			hasLegend,
			palette,
			colorMap,

			xAxisField,
			xAxisFormatter,
			xAxisTitle,
			xAxisTitleColor,
			xAxisTickCount,

			yAxisFields,
			yAxisFormatter,
			yAxisTitle,
			yAxisTitleColor,
			yAxisIsStacked,
			yAxisTickCount,
			yAxisMin,
			yAxisTooltipFormatter,
			yAxisTooltipDataFormatter,
			yAxisMax = yAxisIsStacked
				? maxByFieldsStacked(data, yAxisFields)
				: maxByFields(data, yAxisFields),

			...passThroughs
		} = this.props;

		const margin = {
			...BarChart.MARGIN,
			...marginOriginal,
		};

		const svgClasses = cx(className, '&');

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		// `paddingInner` determines the space between the bars or groups of bars
		const paddingInner = yAxisFields.length > 1
			? BarChart.PADDING_GROUPED_OR_STACKED
			: BarChart.PADDING;

		const xScale = d3Scale
			.scaleBand()
			.domain(_.map(data, xAxisField))
			.range([0, innerWidth])
			.paddingInner(paddingInner)
			.paddingOuter(0.5);

		const yScale = d3Scale
			.scaleLinear()
			.domain([yAxisMin, yAxisMax])
			.range([innerHeight, 0]);

		const yAxisFinalFormatter = yAxisFormatter || yScale.tickFormat();

		const yFinalFormatter = yAxisTooltipDataFormatter
			? yAxisTooltipDataFormatter
			: yAxisFinalFormatter;

		if (_.isEmpty(data) || width < 1 || height < 1 || isLoading) {
			const emptyStateWrapper = getFirst(
				this.props,
				BarChart.EmptyStateWrapper,
				<BarChart.EmptyStateWrapper Title="You have no data." />
			);

			return (
				<EmptyStateWrapper
					{...emptyStateWrapper.props}
					isEmpty={_.isEmpty(data)}
					isLoading={isLoading}
				>
					{emptyStateWrapper.props.children}
					<svg
						{...omitProps(passThroughs, BarChart)}
						className={svgClasses}
						width={width}
						height={height}
					>
						{/* x axis */}
						<g
							transform={`translate(${margin.left}, ${innerHeight + margin.top})`}
						>
							<Axis orient="bottom" scale={xScale} tickCount={xAxisTickCount} />
						</g>

						{/* y axis */}
						<g transform={`translate(${margin.left}, ${margin.top})`}>
							<Axis
								orient="left"
								scale={yScale}
								tickFormat={yFinalFormatter}
								tickCount={yAxisTickCount}
							/>
						</g>
					</svg>
				</EmptyStateWrapper>
			);
		}

		return (
			<svg
				{...omitProps(passThroughs, BarChart)}
				className={svgClasses}
				width={width}
				height={height}
			>
				{/* x axis */}
				<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
					<Axis
						orient="bottom"
						scale={xScale}
						outerTickSize={0}
						tickCount={xAxisTickCount}
					/>

					{hasLegend
						? <ContextMenu
								direction="down"
								alignment="center"
								directonOffset={
									(margin.bottom / 2 + Legend.HEIGHT / 2) *
										-1 /* should center the legend in the bottom margin */
								}
							>
								<ContextMenu.Target elementType="g">
									<rect
										className={cx('&-invisible')}
										width={innerWidth}
										height={margin.bottom}
									/>
								</ContextMenu.Target>
								<ContextMenu.FlyOut className={cx('&-legend-container')}>
									<Legend orient="horizontal">
										{_.map(yAxisFields, (field, index) => (
											<Legend.Item
												key={index}
												hasPoint={true}
												hasLine={false}
												color={_.get(
													colorMap,
													field,
													palette[index % palette.length]
												)}
												pointKind={1}
											>
												{_.get(legend, field, field)}
											</Legend.Item>
										))}
									</Legend>
								</ContextMenu.FlyOut>
							</ContextMenu>
						: null}

				</g>

				{/* x axis title */}
				{xAxisTitle
					? <g
							transform={`translate(${margin.left}, ${margin.top + innerHeight})`}
						>
							<AxisLabel
								orient="bottom"
								width={innerWidth}
								height={margin.bottom}
								label={xAxisTitle}
								color={
									_.isString(xAxisTitleColor)
										? xAxisTitleColor
										: palette[xAxisTitleColor % palette.length]
								}
							/>
						</g>
					: null}

				{/* y axis */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Axis
						orient="left"
						scale={yScale}
						tickFormat={yAxisFinalFormatter}
						tickCount={yAxisTickCount}
					/>
				</g>

				{/* y axis title */}
				{yAxisTitle
					? <g transform={`translate(0, ${margin.top})`}>
							<AxisLabel
								orient="left"
								width={margin.left}
								height={innerHeight}
								label={yAxisTitle}
								color={
									_.isString(yAxisTitleColor)
										? yAxisTitleColor
										: palette[yAxisTitleColor % palette.length]
								}
							/>
						</g>
					: null}

				{/* bars */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Bars
						xField={xAxisField}
						xScale={xScale}
						xFormatter={xAxisFormatter}
						yFields={yAxisFields}
						yScale={yScale}
						yFormatter={yFinalFormatter}
						yStackedMax={yAxisMax}
						data={data}
						isStacked={yAxisIsStacked}
						yTooltipFormatter={yAxisTooltipFormatter}
						hasToolTips={hasToolTips}
						legend={legend}
						palette={palette}
						colorMap={colorMap}
					/>
				</g>
			</svg>
		);
	},
});

export default BarChart;
