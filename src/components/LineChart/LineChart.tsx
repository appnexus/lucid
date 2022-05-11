import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import * as d3Scale from 'd3-scale';
import * as d3TimeFormat from 'd3-time-format';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, getFirst, Overwrite } from '../../util/component-types';
import {
	minByFields,
	maxByFields,
	maxByFieldsStacked,
	formatDate,
	nearest,
	Collection,
} from '../../util/chart-helpers';
import * as chartConstants from '../../constants/charts';
import Axis from '../Axis/Axis';
import AxisLabel from '../AxisLabel/AxisLabel';
import Legend from '../Legend/Legend';
import Lines from '../Lines/Lines';
import Points from '../Points/Points';
import { ToolTipDumb as ToolTip } from '../ToolTip/ToolTip';
import ContextMenu from '../ContextMenu/ContextMenu';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';

const cx = lucidClassNames.bind('&-LineChart');

const {
	arrayOf,
	func,
	instanceOf,
	number,
	object,
	shape,
	string,
	bool,
	oneOfType,
	oneOf,
} = PropTypes;

interface ILineChartMargin {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}

type yFormatterFunction = (y: number) => string;

export interface ILineChartPropsRaw extends StandardProps {
	/** Child components of LineChart */
	EmptyStateWrapper?: React.ReactNode;

	/** Height of the chart. */
	height: number;

	/** Width of the chart. */
	width: number;

	/**
	 * 	Margin is an object defining the margins of the chart. These margins will contain
	 * 	the axis and labels.
	 */
	margin: ILineChartMargin;

	/**
	 * Data for the chart. E.g.
	 *
	 * 	[
	 * 		{ x: new Date('2015-01-01') , y: 1 } ,
	 * 		{ x: new Date('2015-01-02') , y: 2 } ,
	 * 		{ x: new Date('2015-01-03') , y: 3 } ,
	 * 		{ x: new Date('2015-01-04') , y: 2 } ,
	 * 		{ x: new Date('2015-01-05') , y: 5 } ,
	 * 	]
	 */
	//data?: Array<{ [key: string]: Date | number | undefined }>;
	data?: Collection;
	/**
	 * Legend is an object with human readable names for fields
	 * that will be used for legends and tooltips. E.g:
	 * {
	 * 	x: 'Date',
	 * 	y: 'Impressions',
	 * }
	 */
	legend?: object;

	/** Controls the visibility of the \`LoadingMessage\`. */
	isLoading?: boolean;

	/** Show tool tips on hover. */
	hasToolTips: boolean;

	/**Show a legend at the bottom of the chart. */
	hasLegend: boolean;

	/**
	 * Plaette takes one of the palettes exported from \`lucid.chartConstants\`.
	 * Available palettes:

		- \`PALETTE_7\` (default)
		- \`PALETTE_30\`
		- \`PALETTE_MONOCHROME_0_5\`
		- \`PALETTE_MONOCHROME_1_5\`
		- \`PALETTE_MONOCHROME_2_5\`
		- \`PALETTE_MONOCHROME_3_5\`
		- \`PALETTE_MONOCHROME_4_5\`
		- \`PALETTE_MONOCHROME_5_5\`
		- \`PALETTE_MONOCHROME_6_5\`
	 */
	palette: string[];

	/** colorMap allows you to pass in an object if you want to map fields to
	 * \`lucid.chartConstants\` or custom colors:
	  	
	 	{
			'imps': COLOR_0,
			'rev': COLOR_3,
			'clicks': '#abc123',
		}
	*/
	colorMap?: object;

	/** The field we should look up your x data by.
	 * The data must be valid javascript dates.
	 */
	xAxisField: string;

	/** The minimum date the x axis should display.
	 * Typically this will be the smallest items from your dataset.
	 * */
	xAxisMin?: Date;

	/** The maximum date the x axis should display.
	 * This should almost always be the largest date from your dataset.
	 * */
	xAxisMax?: Date;

	/** An optional function used to format your x axis data.
	 * If you don't provide anything, we use the default D3 date variable formatter.
	 * */
	xAxisFormatter?: (d: Date) => string;

	/** An optional function used to format your x axis dates in the tooltips.*/
	xAxisTooltipFormatter: (x: string | number) => string | number;

	/** There are some cases where you need to only show a "sampling" of ticks on the x axis.
	 * This number will control that.
	 * */
	xAxisTickCount: number | null;

	/** In some cases xAxisTickCount is not enough and you want to specify
	 * exactly where the tick marks should appear on the x axis.
	 * This prop takes an array of dates (currently only dates are supported for the x axis).
	 * This prop will override the \`xAxisTickCount\` prop. */
	xAxisTicks?: Date[];

	/** Set a title for the x axis. */
	xAxisTitle?: string | null;

	/** Set a color for the x axis title. 
	 * Use the color constants exported off `lucid.chartConstants\`. 
	 * E.g.:
	 	- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\` // custom color hex 

		\`number\` is supported only for backwards compatability.
	*/
	xAxisTitleColor: number | string;

	/** Determines the orientation of the tick text.
	 * This may override what the orient prop tries to determine.*/
	xAxisTextOrientation: 'vertical' | 'horizontal' | 'diagonal';

	/** An array of your y axis fields. Typically this will just be a single item
	 * unless you need to display multiple lines.
	 * The order of the array determines the series order in the chart. */

	yAxisFields: string[];

	/** The minimum number the y axis should display.
	 * Typically this should be \`0\`. */
	yAxisMin: number;

	/** The maximum number the y axis should display.
	 * This should almost always be the largest number from your dataset. */
	yAxisMax?: number;

	/** An optional function used to format your y axis data.
	 * If you don't provide anything, we use the default D3 formatter. */
	yAxisFormatter?: yFormatterFunction;

	/** Stack the y axis data. This is only useful if you have multiple	\`yAxisFields\`.
	 * Stacking will cause the chart to be aggregated by sum. */
	yAxisIsStacked: boolean;

	/** Display points along with the y axis lines. */
	yAxisHasPoints: boolean;

	/** There are some cases where you need to only show a "sampling" of ticks on the y axis.
	 * This number will determine the number of ticks. */
	yAxisTickCount: number | null;

	/** Set a title for the y axis. */
	yAxisTitle: string | null;

	// 	Set a color for the y axis title. Use the color constants exported off
	// 	\`lucid.chartConstants\`. E.g.:

	// 	- \`COLOR_0\`
	// 	- \`COLOR_GOOD\`
	// 	- \`'#123abc'\` // custom color hex

	// 	\`number\` is supported only for backwards compatability.
	yAxisTitleColor: number | string;

	// 	An optional function used to format your y axis titles and data in the
	// 	tooltips. The first value is the name of your y field, the second value
	// 	is your post-formatted y value, and the third value is your non-formatted
	// 	y-value.  Signature: \`(yField, yValueFormatted, yValue) => {}\`
	yAxisTooltipFormatter: (
		yField: string,
		yValueFormatted: string | number,
		yValue: number
	) => string | number;

	/** An optional function used to format data in the tooltips. */
	yAxisTooltipDataFormatter?: (y: number) => string | number;

	/** Set the starting index where colors start rotating for points and lines along the y axis. */
	yAxisColorOffset: number;

	/**  An array of your y2 axis fields.
	 * Typically this will just be a single item unless you need to display multiple lines.
	 * The order of the array determines the series order in the chart. */
	y2AxisFields: string[];

	/** The minimum number the y2 axis should display.
	 * Typically this should be \`0\`. */
	y2AxisMin: number;

	/** The maximum number the y2 axis should display.
	 * This should almost always be the largest number from your dataset. */
	y2AxisMax?: number;

	/** An optional function used to format your y2 axis data.
	 * If you don't provide anything, we use the default D3 formatter. */
	y2AxisFormatter?: yFormatterFunction;

	/**
	 * An optional function used to format data in the tooltips.
	 */
	y2AxisTooltipDataFormatter?: yFormatterFunction;

	/** Stack the y2 axis data.
	 * This is only useful if you have multiple	\`y2AxisFields\`.
	 * Stacking will cause the chart to be aggregated by sum. */
	y2AxisIsStacked: boolean;

	/** Display points along with the y2 axis lines. */
	y2AxisHasPoints: boolean;

	/** There are some cases where you need to only show a "sampling" of ticks on the y2 axis.
	 * This number will control the "sampling". */
	y2AxisTickCount: number | null;

	/** Set a title for the y2 axis. */
	y2AxisTitle: string | null;

	/** Set a color for the y2 axis title. 
	 * Use the color constants exported off	\`lucid.chartConstants\`. E.g.:
	 	- \`COLOR_0\`
	 	- \`COLOR_GOOD\`
	 	- \`'#123abc'\` // custom color hex

	 	\`number\` is supported only for backwards compatability. */
	y2AxisTitleColor: number | string;

	/** Set the starting index where colors start rotating for points and lines along the y2 axis. */
	y2AxisColorOffset: number;

	/** Determines the orientation of the tick text.
	 * This may override what the orient prop tries to determine.  */
	yAxisTextOrientation: 'vertical' | 'horizontal' | 'diagonal';
}

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'className',
	'height',
	'width',
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
];

export type ILineChartProps = Overwrite<
	React.SVGProps<SVGGElement>,
	ILineChartPropsRaw
>;

export interface ILineChartState {
	isHovering: boolean;
	mouseX?: number | string;
}

class LineChart extends React.Component<ILineChartProps, ILineChartState, {}> {
	static displayName = 'LineChart';

	static peek = {
		description: `The \`LineChart\` presents data over time. Currently only dates are supported on the x axis and numeric values on the y. If you need discrete values on the x axis, consider using the \`BarChart\` instead.`,
		categories: ['visualizations', 'charts'],
		madeFrom: ['ContextMenu', 'ToolTip'],
	};

	static MARGIN = {
		top: 10,
		right: 80,
		bottom: 65,
		left: 80,
	};

	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Height of the chart.
		*/
		height: number,

		/**
			Width of the chart.
		*/
		width: number,

		/**
			An object defining the margins of the chart. These margins will contain
			the axis and labels.
		*/
		margin: shape({
			top: number,
			right: number,
			bottom: number,
			left: number,
		}),

		/**
			Data for the chart. E.g.
	
				[
					{ x: new Date('2015-01-01') , y: 1 } ,
					{ x: new Date('2015-01-02') , y: 2 } ,
					{ x: new Date('2015-01-03') , y: 3 } ,
					{ x: new Date('2015-01-04') , y: 2 } ,
					{ x: new Date('2015-01-05') , y: 5 } ,
				]
		*/
		data: arrayOf(object),

		/**
			An object with human readable names for fields that will be used for
			legends and tooltips. E.g:
	
				{
					x: 'Date',
					y: 'Impressions',
				}
		*/
		legend: object,

		/**
			Controls the visibility of the \`LoadingMessage\`.
		*/
		isLoading: bool,

		/**
			Show tool tips on hover.
		*/
		hasToolTips: bool,

		/**
			Show a legend at the bottom of the chart.
		*/
		hasLegend: bool,

		/**
			Takes one of the palettes exported from \`lucid.chartConstants\`.
			Available palettes:
	
			- \`PALETTE_7\` (default)
			- \`PALETTE_30\`
			- \`PALETTE_MONOCHROME_0_5\`
			- \`PALETTE_MONOCHROME_1_5\`
			- \`PALETTE_MONOCHROME_2_5\`
			- \`PALETTE_MONOCHROME_3_5\`
			- \`PALETTE_MONOCHROME_4_5\`
			- \`PALETTE_MONOCHROME_5_5\`
			- \`PALETTE_MONOCHROME_6_5\`
		*/
		palette: arrayOf(string),

		/**
			You can pass in an object if you want to map fields to
			\`lucid.chartConstants\` or custom colors:
	
				{
					'imps': COLOR_0,
					'rev': COLOR_3,
					'clicks': '#abc123',
				}
		*/
		colorMap: object,

		/**
			The field we should look up your x data by. The data must be valid
			javascript dates.
		*/
		xAxisField: string,

		/**
			The minimum date the x axis should display. Typically this will be the
			smallest items from your dataset.
		*/
		xAxisMin: instanceOf(Date),

		/**
			The maximum date the x axis should display. This should almost always be
			the largest date from your dataset.
		*/
		xAxisMax: instanceOf(Date),

		/**
			An optional function used to format your x axis data. If you don't
			provide anything, we use the default D3 date variable formatter.
		*/
		xAxisFormatter: func,

		/**
			An optional function used to format your x axis dates in the tooltips.
		*/
		xAxisTooltipFormatter: func,

		/**
			There are some cases where you need to only show a "sampling" of ticks on
			the x axis. This number will control that.
		*/
		xAxisTickCount: number,

		/**
			In some cases xAxisTickCount is not enough and you want to specify
			exactly where the tick marks should appear on the x axis. This prop takes
			an array of dates (currently only dates are supported for the x axis).
			This prop will override the \`xAxisTickCount\` prop.
		*/
		xAxisTicks: arrayOf(instanceOf(Date)),

		/**
			Set a title for the x axis.
		*/
		xAxisTitle: string,

		/**
			Set a color for the x axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:
	
			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex
	
			\`number\` is supported only for backwards compatability.
		*/
		xAxisTitleColor: oneOfType([number, string]),

		/**
			Determines the orientation of the tick text. This may override what the orient prop
			tries to determine.
		*/
		xAxisTextOrientation: oneOf(['vertical', 'horizontal', 'diagonal']),

		/**
			An array of your y axis fields. Typically this will just be a single item
			unless you need to display multiple lines. The order of the array
			determines the series order in the chart.
		*/
		yAxisFields: arrayOf(string),

		/**
			The minimum number the y axis should display. Typically this should be
			\`0\`.
		*/
		yAxisMin: number,

		/**
			The maximum number the y axis should display. This should almost always
			be the largest number from your dataset.
		*/
		yAxisMax: number,

		/**
			An optional function used to format your y axis data. If you don't
			provide anything, we use the default D3 formatter.
		*/
		yAxisFormatter: func,

		/**
			Stack the y axis data. This is only useful if you have multiple
			\`yAxisFields\`. Stacking will cause the chart to be aggregated by sum.
		*/
		yAxisIsStacked: bool,

		/**
			Display points along with the y axis lines.
		*/
		yAxisHasPoints: bool,

		/**
			There are some cases where you need to only show a "sampling" of ticks on
			the y axis. This number will control that.
		*/
		yAxisTickCount: number,

		/**
			Set a title for the y axis.
		*/
		yAxisTitle: string,

		/**
			Set a color for the y axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:
	
			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex
	
			\`number\` is supported only for backwards compatability.
		*/
		yAxisTitleColor: oneOfType([number, string]),

		/**
			An optional function used to format your y axis titles and data in the
			tooltips. The first value is the name of your y field, the second value
			is your post-formatted y value, and the third value is your non-formatted
			y-value.  Signature: \`(yField, yValueFormatted, yValue) => {}\`
		*/
		yAxisTooltipFormatter: func,

		/**
			An optional function used to format data in the tooltips.
		*/
		yAxisTooltipDataFormatter: func,

		/**
			Set the starting index where colors start rotating for points and lines
			along the y axis.
		*/
		yAxisColorOffset: number,

		/**
			An array of your y2 axis fields. Typically this will just be a single
			item unless you need to display multiple lines. The order of the array
			determines the series order in the chart.
		*/
		y2AxisFields: arrayOf(string),

		/**
			The minimum number the y2 axis should display. Typically this should be
			\`0\`.
		*/
		y2AxisMin: number,

		/**
			The maximum number the y2 axis should display. This should almost always
			be the largest number from your dataset.
		*/
		y2AxisMax: number,

		/**
			An optional function used to format your y2 axis data. If you don't
			provide anything, we use the default D3 formatter.
		*/
		y2AxisFormatter: func,

		/**
			An optional function used to format data in the tooltips.
		*/
		y2AxisTooltipDataFormatter: func,

		/**
			Stack the y2 axis data. This is only useful if you have multiple
			\`y2AxisFields\`. Stacking will cause the chart to be aggregated by sum.
		*/
		y2AxisIsStacked: bool,

		/**
			Display points along with the y2 axis lines.
		*/
		y2AxisHasPoints: bool,

		/**
			There are some cases where you need to only show a "sampling" of ticks on
			the y2 axis. This number will control that.
		*/
		y2AxisTickCount: number,

		/**
			Set a title for the y2 axis.
		*/
		y2AxisTitle: string,

		/**
			Set a color for the y2 axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:
	
			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex
	
			\`number\` is supported only for backwards compatability.
		*/
		y2AxisTitleColor: oneOfType([number, string]),

		/**
			Set the starting index where colors start rotating for points and lines
			along the y2 axis.
		*/
		y2AxisColorOffset: number,

		/**
			Determines the orientation of the tick text. This may override what the orient prop
			tries to determine.
		*/
		yAxisTextOrientation: oneOf(['vertical', 'horizontal', 'diagonal']),
	};

	static defaultProps = {
		height: 400,
		width: 1000,
		margin: {
			top: 10,
			right: 80,
			bottom: 65,
			left: 80,
		},
		hasToolTips: true,
		hasLegend: false,
		palette: chartConstants.PALETTE_7,
		xAxisField: 'x',
		xAxisFormatter: formatDate,
		// E.g. "Mon 06/06/2016 15:46:19"
		xAxisTooltipFormatter: d3TimeFormat.timeFormat('%a %x %X'),
		xAxisTickCount: null,
		xAxisTicks: undefined, // intentionally undefined so that `Axis` can default it correctly
		xAxisTitle: null,
		xAxisTitleColor: '#000',
		xAxisTextOrientation: 'horizontal',
		yAxisFields: ['y'],
		yAxisMin: 0,
		yAxisIsStacked: false,
		yAxisHasPoints: true,
		yAxisTickCount: null,
		yAxisTitle: null,
		yAxisTitleColor: '#000',
		yAxisTooltipFormatter: (yField: string, yValueFormatted: number) =>
			`${yField}: ${yValueFormatted}`,
		yAxisColorOffset: 0,

		y2AxisFields: [],
		y2AxisMin: 0,
		y2AxisIsStacked: false,
		y2AxisHasPoints: true,
		y2AxisTickCount: null,
		y2AxisTitle: null,
		y2AxisTitleColor: '#000',
		y2AxisColorOffset: 1,
		yAxisTextOrientation: 'horizontal',
	};

	state = {
		isHovering: false,
		mouseX: undefined,
	};

	static EmptyStateWrapper = EmptyStateWrapper;

	handleToolTipHoverZone = (
		{ clientX, target }: { clientX: number; target: SVGRectElement },
		xPoints: number[]
	): void => {
		const mouseX = nearest(
			xPoints,
			clientX - target.getBoundingClientRect().left
		);
		if (!this.state.isHovering || this.state.mouseX !== mouseX) {
			this.setState({
				isHovering: true,
				mouseX: nearest(xPoints, clientX - target.getBoundingClientRect().left),
			});
		}
	};

	renderY2Axis = (
		xScale: d3Scale.ScaleTime<number, number>,
		y2Scale: d3Scale.ScaleLinear<number, number>,
		y2AxisFinalFormatter: yFormatterFunction,
		margin: ILineChartMargin
	) => {
		const {
			y2AxisFields,
			yAxisFields,
			y2AxisTickCount,
			y2AxisTitle,
			y2AxisTitleColor,
			palette,
			xAxisField,
			y2AxisMax,
			data,
			y2AxisIsStacked,
			y2AxisColorOffset,
			colorMap,
			y2AxisHasPoints,
		} = this.props as ILineChartPropsRaw;

		/* y2 axis */
		const axis = y2AxisFields ? (
			<g
				transform={`translate(${(margin.left as number) + innerWidth}, ${
					margin.top
				})`}
			>
				<Axis
					orient='right'
					scale={y2Scale}
					tickFormat={y2AxisFinalFormatter as any}
					tickCount={y2AxisTickCount}
				/>
			</g>
		) : null;

		/* y2 axis title */
		const axisTitle = y2AxisTitle ? (
			<g
				transform={`translate(${(margin.left as number) + innerWidth}, ${
					margin.top
				})`}
			>
				<AxisLabel
					orient='right'
					width={margin.right as number}
					height={innerHeight}
					label={y2AxisTitle}
					color={
						_.isString(y2AxisTitleColor)
							? y2AxisTitleColor
							: palette[y2AxisTitleColor % palette.length]
					}
				/>
			</g>
		) : null;

		const axisLines = y2AxisFields ? (
			<g transform={`translate(${margin.left as number}, ${margin.top})`}>
				<Lines
					xScale={xScale}
					yScale={y2Scale}
					xField={xAxisField}
					yFields={y2AxisFields}
					yStackedMax={y2AxisMax}
					data={data || ({} as any)}
					isStacked={y2AxisIsStacked}
					colorOffset={y2AxisColorOffset + yAxisFields.length}
					colorMap={colorMap}
					palette={palette}
				/>
			</g>
		) : null;

		const axisPoints =
			y2AxisFields && y2AxisHasPoints ? (
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Points
						xScale={xScale}
						yScale={y2Scale}
						xField={xAxisField}
						yFields={y2AxisFields}
						yStackedMax={y2AxisMax}
						data={data || ({} as any)}
						isStacked={y2AxisIsStacked}
						colorOffset={y2AxisColorOffset + yAxisFields.length}
						colorMap={colorMap}
						palette={palette}
					/>
				</g>
			) : null;

		return {
			title: axisTitle,
			lines: axisLines,
			points: axisPoints,
			axis: axis,
		};
	};

	render(): React.ReactNode {
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
			xAxisTickCount,
			xAxisTicks,
			xAxisTitle,
			xAxisTitleColor,
			xAxisFormatter,
			xAxisTooltipFormatter,
			xAxisMin = minByFields(data as any, xAxisField) as Date,
			xAxisMax = maxByFields(data as any, xAxisField) as Date,
			xAxisTextOrientation,

			yAxisFields,
			yAxisFormatter,
			yAxisHasPoints,
			yAxisIsStacked,
			yAxisTickCount,
			yAxisTitle,
			yAxisTitleColor,
			yAxisMin,
			yAxisTooltipFormatter,
			yAxisTooltipDataFormatter,
			yAxisMax = (yAxisIsStacked
				? maxByFieldsStacked(data as any, yAxisFields)
				: maxByFields(data as any, yAxisFields)) as number,
			yAxisColorOffset,

			y2AxisFields,
			y2AxisFormatter,
			y2AxisTooltipDataFormatter,
			y2AxisHasPoints,
			y2AxisIsStacked,
			y2AxisMin,
			y2AxisMax = (y2AxisFields && y2AxisIsStacked
				? maxByFieldsStacked(data as any, y2AxisFields)
				: maxByFields(data as any, y2AxisFields)) as number,
			y2AxisColorOffset,
			yAxisTextOrientation,
			...passThroughs
		} = this.props;

		const { isHovering, mouseX } = this.state;

		const margin = {
			...LineChart.MARGIN,
			...marginOriginal,
		};

		const svgClasses = cx(className, '&');

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		/**
		 * x axis
		 */
		const xScale = d3Scale
			.scaleTime()
			.domain([xAxisMin, xAxisMax])
			.range([0, innerWidth]);

		const xFinalFormatter = xAxisFormatter
			? xAxisFormatter
			: xScale.tickFormat();

		const allYFields = _.compact(yAxisFields.concat(y2AxisFields));

		// This is used to map x mouse values back to data points.
		const xPointMap = _.reduce(
			data,
			(acc, d) => {
				// `floor` to avoid rounding errors, it doesn't need to be super precise
				// since we're dealing with pixels
				const point = Math.floor(xScale(d[xAxisField] as any) as any);

				_.each(allYFields, (field) => {
					_.set(acc, `${point}.y.${field}`, d[field]);
					_.set(acc, `${point}.x`, d[xAxisField]);
				});

				return acc;
			},
			{}
		);
		const xPoints = _.map(_.keys(xPointMap), _.toNumber);

		/**
		 * y axis
		 */
		const yScale = d3Scale
			.scaleLinear()
			.domain([yAxisMin, yAxisMax])
			.range([innerHeight, 0]);

		const yAxisFinalFormatter = yAxisFormatter || yScale.tickFormat();

		const yFinalFormatter = yAxisTooltipDataFormatter
			? yAxisTooltipDataFormatter
			: yAxisFinalFormatter;

		const yAxisHasLinesFinal = !(yAxisIsStacked && !yAxisHasPoints);
		const yAxisHasPointsFinal = yAxisHasPoints || yAxisIsStacked;

		/**
		 * y2 axis
		 */
		let y2Axis = {};
		let y2AxisLegend: JSX.Element[] | null = null;
		let y2AxisToolTip: Array<JSX.Element | null> | null = null;
		if (y2AxisFields) {
			const y2Scale = d3Scale
				.scaleLinear()
				.domain([y2AxisMin, y2AxisMax])
				.range([innerHeight, 0]);

			const y2AxisFinalFormatter = y2AxisFormatter
				? y2AxisFormatter
				: y2Scale
				? y2Scale.tickFormat()
				: (_.identity as yFormatterFunction);

			const y2FinalFormatter = y2AxisTooltipDataFormatter
				? y2AxisTooltipDataFormatter
				: y2AxisFinalFormatter;

			const y2AxisHasPointsFinal = y2AxisHasPoints || y2AxisIsStacked;
			const y2AxisHasLinesFinal = !(y2AxisIsStacked && !y2AxisHasPoints);

			y2Axis = this.renderY2Axis(xScale, y2Scale, y2AxisFinalFormatter, margin);

			y2AxisLegend = _.map(y2AxisFields, (field, index) => (
				<Legend.Item
					key={index}
					hasPoint={y2AxisHasPointsFinal}
					hasLine={y2AxisHasLinesFinal}
					color={_.get(
						colorMap,
						field,
						palette[
							y2AxisColorOffset + index + (yAxisFields.length % palette.length)
						]
					)}
					pointKind={
						y2AxisHasPoints ? y2AxisColorOffset + index + yAxisFields.length : 1
					}
				>
					{_.get(legend, field, field)}
				</Legend.Item>
			));

			y2AxisToolTip = _.map(y2AxisFields, (field, index) =>
				!_.isNil(_.get(xPointMap, mouseX + '.y.' + field)) ? (
					<Legend.Item
						key={index}
						hasPoint={y2AxisHasPointsFinal}
						hasLine={y2AxisHasLinesFinal}
						color={_.get(
							colorMap,
							field,
							palette[
								y2AxisColorOffset +
									index +
									(yAxisFields.length % palette.length)
							]
						)}
						pointKind={
							y2AxisHasPoints
								? y2AxisColorOffset + index + yAxisFields.length
								: 1
						}
					>
						{yAxisTooltipFormatter(
							_.get(legend, field, field),
							y2FinalFormatter(_.get(xPointMap, mouseX + '.y.' + field)),
							_.get(xPointMap, mouseX + '.y.' + field)
						)}
					</Legend.Item>
				) : null
			);
		}

		if (_.isEmpty(data) || width < 1 || height < 1 || isLoading) {
			const emptyStateWrapper = getFirst(
				this.props,
				LineChart.EmptyStateWrapper
			) || <LineChart.EmptyStateWrapper Title='You have no data.' />;
			const emptyStateWrapperProps = _.get(emptyStateWrapper, 'props', {});
			const emptyStateWrapperChildren = _.get(
				emptyStateWrapperProps,
				'children',
				[]
			);

			return (
				<EmptyStateWrapper
					{...emptyStateWrapperProps}
					isEmpty={_.isEmpty(data)}
					isLoading={isLoading}
				>
					{emptyStateWrapperChildren}
					<svg
						{...(omit(passThroughs, nonPassThroughs) as any)}
						className={svgClasses}
						width={width}
						height={height}
					>
						{/* y axis */}
						<g transform={`translate(${margin.left}, ${margin.top})`}>
							<Axis
								orient='left'
								scale={yScale}
								tickFormat={yAxisFormatter as any}
							/>
						</g>
						{/* x axis */}
						<g
							transform={`translate(${margin.left}, ${
								innerHeight + margin.top
							})`}
						>
							<Axis
								orient='bottom'
								scale={xScale}
								tickFormat={xFinalFormatter as any}
							/>
						</g>
					</svg>
				</EmptyStateWrapper>
			);
		}

		return (
			<svg
				{...(omit(passThroughs, nonPassThroughs) as any)}
				className={svgClasses}
				width={width}
				height={height}
			>
				{/* tooltips */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					{hasToolTips && isHovering && !_.isNil(mouseX) ? (
						<ToolTip
							isLight={true}
							isExpanded={true}
							flyOutMaxWidth='none'
							alignment={
								(mouseX as unknown as number) < innerWidth * 0.15
									? 'start'
									: (mouseX as unknown as number) > innerWidth * 0.85
									? 'end'
									: 'center'
							}
						>
							<ToolTip.Target elementType='g'>
								<path
									className={cx('&-tooltip-line')}
									d={`M${mouseX},0 L${mouseX},${innerHeight}`}
								/>
							</ToolTip.Target>
							<ToolTip.Title>
								{xAxisTooltipFormatter(_.get(xPointMap, `${mouseX}.x`))}
							</ToolTip.Title>
							<ToolTip.Body>
								<Legend hasBorders={false} isReversed={yAxisIsStacked}>
									{_.map(yAxisFields, (field, index) =>
										!_.isNil(_.get(xPointMap, mouseX + '.y.' + field)) ? (
											<Legend.Item
												key={index}
												hasPoint={yAxisHasPointsFinal}
												hasLine={yAxisHasLinesFinal}
												color={_.get(
													colorMap,
													field,
													palette[(index + yAxisColorOffset) % palette.length]
												)}
												pointKind={
													yAxisHasPoints ? index + yAxisColorOffset : 1
												}
											>
												{yAxisTooltipFormatter(
													_.get(legend, field, field),
													yFinalFormatter(
														_.get(xPointMap, mouseX + '.y.' + field)
													),
													_.get(xPointMap, mouseX + '.y.' + field)
												)}
											</Legend.Item>
										) : null
									)}
									{y2AxisToolTip}
								</Legend>
							</ToolTip.Body>
						</ToolTip>
					) : null}
				</g>

				{/* x axis */}
				<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
					<Axis
						orient='bottom'
						scale={xScale}
						outerTickSize={0}
						tickFormat={xFinalFormatter as any}
						tickCount={xAxisTickCount}
						ticks={xAxisTicks}
						textOrientation={xAxisTextOrientation}
					/>

					{/* legend */}
					{hasLegend ? (
						<ContextMenu
							direction='down'
							alignment='center'
							directonOffset={
								(margin.bottom / 2 + Legend.HEIGHT / 2) *
								-1 /* should center the legend in the bottom margin */
							}
						>
							<ContextMenu.Target elementType='g'>
								<rect
									className={cx('&-invisible')}
									width={innerWidth}
									height={margin.bottom}
								/>
							</ContextMenu.Target>
							<ContextMenu.FlyOut className={cx('&-legend-container')}>
								<Legend orient='horizontal'>
									{_.map(yAxisFields, (field, index) => (
										<Legend.Item
											key={index}
											hasPoint={yAxisHasPointsFinal}
											hasLine={yAxisHasLinesFinal}
											color={_.get(
												colorMap,
												field,
												palette[index + (yAxisColorOffset % palette.length)]
											)}
											pointKind={yAxisHasPoints ? index + yAxisColorOffset : 1}
										>
											{_.get(legend, field, field)}
										</Legend.Item>
									))}
									{y2AxisLegend}
								</Legend>
							</ContextMenu.FlyOut>
						</ContextMenu>
					) : null}
				</g>

				{/* x axis title */}
				{xAxisTitle ? (
					<g
						transform={`translate(${margin.left}, ${margin.top + innerHeight})`}
					>
						<AxisLabel
							orient='bottom'
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
				) : null}

				{/* y axis */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Axis
						orient='left'
						scale={yScale}
						tickFormat={yAxisFinalFormatter as any}
						tickCount={yAxisTickCount}
						textOrientation={yAxisTextOrientation}
					/>
				</g>

				{/* y axis title */}
				{yAxisTitle ? (
					<g transform={`translate(0, ${margin.top})`}>
						<AxisLabel
							orient='left'
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
				) : null}

				{/* y2 axis */}
				{_.get(y2Axis, 'axis', null)}

				{/* y2 axis title */}
				{_.get(y2Axis, 'title', null)}

				{/* y axis lines */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Lines
						xScale={xScale}
						yScale={yScale}
						xField={xAxisField}
						yFields={yAxisFields}
						yStackedMax={yAxisMax}
						data={data || ({} as any)}
						isStacked={yAxisIsStacked}
						colorMap={colorMap}
						palette={palette}
						colorOffset={yAxisColorOffset}
					/>
				</g>

				{/* y axis points */}
				{yAxisHasPoints ? (
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<Points
							xScale={xScale}
							yScale={yScale}
							xField={xAxisField}
							yFields={yAxisFields}
							yStackedMax={yAxisMax}
							data={data as any}
							isStacked={yAxisIsStacked}
							colorMap={colorMap}
							palette={palette}
							colorOffset={yAxisColorOffset}
						/>
					</g>
				) : null}

				{/* y2 axis lines */}
				{_.get(y2Axis, 'lines', null)}

				{/* y2 axis points */}
				{_.get(y2Axis, 'points', null)}

				{/* hover capture zone */}
				{hasToolTips ? (
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<rect
							className={cx('&-invisible')}
							width={innerWidth}
							height={innerHeight}
							onMouseMove={(event) => {
								this.handleToolTipHoverZone(
									event as unknown as {
										clientX: number;
										target: SVGRectElement;
									},
									xPoints
								);
							}}
							onMouseOut={() => {
								this.setState({ isHovering: false });
							}}
						/>
					</g>
				) : null}
			</svg>
		);
	}
}

export default LineChart;
