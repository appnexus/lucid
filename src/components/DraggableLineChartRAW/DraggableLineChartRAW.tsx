import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	StandardProps,
	getFirst,
	omitProps,
	Overwrite,
} from '../../util/component-types';
import * as d3Scale from 'd3-scale';
import * as d3Selection from 'd3-selection';
// import * as d3TimeFormat from 'd3-time-format';
import * as chartConstants from '../../constants/charts';
import Axis from '../Axis/Axis';
import AxisLabel from '../AxisLabel/AxisLabel';
// import Lines from '../Lines/Lines';
// import Points from '../Points/Points';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';
import { formatDate, maxByFields, minByFields } from '../../util/chart-helpers';

const cx = lucidClassNames.bind('&-DraggableLineChartRAW');

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

interface IDraggableLineChartRAWMargin {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}

type yFormatterFunction = (y: number) => string;

export interface IDraggableLineChartPropsRAWRaw extends StandardProps {
	/** NOTE: for now, a lot of these are just brought in straight from LineChart.
	 */
	/** Child components of DraggableLineChart */
	EmptyStateWrapper?: React.ReactNode;

	/** Height of the chart. */
	height: number;

	/** Width of the chart. */
	width: number;

	/**
	 * 	Margin is an object defining the margins of the chart. These margins will contain
	 * 	the axis and labels.
	 */
	margin: IDraggableLineChartRAWMargin;

	/**
	 * Data for the chart. E.g.
	 * { x: new Date('2015-01-01') , y: 1 } ,
	 * { x: new Date('2015-01-02') , y: 2 } ,
	 * { x: new Date('2015-01-03') , y: 3 } ,
	 * { x: new Date('2015-01-04') , y: 2 } ,
	 * { x: new Date('2015-01-05') , y: 5 } ,
	 * ]
	 * (brought in from LineChart)
	 */
	data: Array<{ [key: string]: Date | number | undefined }>;

	/** Controls the visibility of the \`LoadingMessage\`. */
	isLoading?: boolean;

	/**
	 * Palette takes one of the palettes exported from \`lucid.chartConstants\`.
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
	xAxisFormatter: (d: Date) => string;

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

	/** There are some cases where you need to only show a "sampling" of ticks on the y axis.
	 * This number will determine the number of ticks. */
	yAxisTickCount: number | null;

	/** Set a title for the y axis. */
	yAxisTitle: string | null;

	/** Set a color for the y axis title. Use the color constants exported off
	 *	\`lucid.chartConstants\`. E.g.:
	 *
	 *		- \`COLOR_0\`
	 *		- \`COLOR_GOOD\`
	 *		- \`'#123abc'\` // custom color hex
	 *
	 *		\`number\` is supported only for backwards compatability.
	 */
	yAxisTitleColor: number | string;

	/** Determines the orientation of the tick text.
	 * This may override what the orient prop tries to determine.  */
	yAxisTextOrientation: 'vertical' | 'horizontal' | 'diagonal';
}

export type IDraggableLineChartRAWProps = Overwrite<
	React.SVGProps<SVGGElement>,
	IDraggableLineChartPropsRAWRaw
	>;

export interface IDraggableLineChartRAWState {
	dragging: boolean;
	mouseY?: number | string;
}

class DraggableLineChartRAW extends React.Component<
	IDraggableLineChartRAWProps,
	IDraggableLineChartRAWState,
	{}
	> {
	static displayName = 'DraggableLineChartRAW';

	static peek = {
		description: `
			The draggable line chart is a single-lined line chart where
			the points on the line are draggable and will update the data real-time.
		`,
		categories: ['visualizations', 'charts'],
	};

	static MARGIN = {
		top: 10,
		right: 80,
		bottom: 65,
		left: 80,
	};

	static propTypes = {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		height: number`
			Height of chart.
		`,

		width: number`
			Width of chart.
		`,

		margin: shape({
			top: number,
			right: number,
			bottom: number,
			left: number,
		})`
			An object defining the margins of the chart. These margins will contain
			the axis and labels.
		`,

		data: arrayOf(object)`
			Data for the chart. E.g.
	
				[
					{ x: new Date('2015-01-01') , y: 1 } ,
					{ x: new Date('2015-01-02') , y: 2 } ,
					{ x: new Date('2015-01-03') , y: 3 } ,
					{ x: new Date('2015-01-04') , y: 2 } ,
					{ x: new Date('2015-01-05') , y: 5 } ,
				]
		`,

		isLoading: bool`
			Controls visibility of \`LoadingMessage\`
		`,

		palette: arrayOf(string)`
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
		`,

		colorMap: object`
			You can pass in an object if you want to map fields to
			\`lucid.chartConstants\` or custom colors:
	
				{
					'imps': COLOR_0,
					'rev': COLOR_3,
					'clicks': '#abc123',
				}
		`,

		xAxisField: string`
			The field we should look up your x data by. The data must be valid
			javascript dates.
		`,

		xAxisMin: instanceOf(Date)`
			The minimum date the x axis should display. Typically this will be the
			smallest items from your dataset.
		`,

		xAxisMax: instanceOf(Date)`
			The maximum date the x axis should display. This should almost always be
			the largest date from your dataset.
		`,

		xAxisFormatter: func`
			An optional function used to format your x axis data. If you don't
			provide anything, we use the default D3 date variable formatter.
		`,

		xAxisTickCount: number`
			There are some cases where you need to only show a "sampling" of ticks on
			the x axis. This number will control that.
		`,

		xAxisTicks: arrayOf(instanceOf(Date))`
			In some cases xAxisTickCount is not enough and you want to specify
			exactly where the tick marks should appear on the x axis. This prop takes
			an array of dates (currently only dates are supported for the x axis).
			This prop will override the \`xAxisTickCount\` prop.
		`,

		xAxisTitle: string`
			Set a title for the x axis.
		`,

		xAxisTitleColor: oneOfType([number, string])`
			Set a color for the x axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:
	
			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex
	
			\`number\` is supported only for backwards compatability.
		`,

		xAxisTextOrientation: oneOf(['vertical', 'horizontal', 'diagonal'])`
			Determines the orientation of the tick text. This may override what the orient prop
			tries to determine.
		`,

		yAxisFields: arrayOf(string)`
			An array of your y axis fields. Typically this will just be a single item
			unless you need to display multiple lines. The order of the array
			determines the series order in the chart.
		`,

		yAxisMin: number`
			The minimum number the y axis should display. Typically this should be
			\`0\`.
		`,

		yAxisMax: number`
			The maximum number the y axis should display. This should almost always
			be the largest number from your dataset.
		`,

		yAxisFormatter: func`
			An optional function used to format your y axis data. If you don't
			provide anything, we use the default D3 formatter.
		`,

		yAxisTickCount: number`
			There are some cases where you need to only show a "sampling" of ticks on
			the y axis. This number will control that.
		`,

		yAxisTitle: string`
			Set a title for the y axis.
		`,

		yAxisTitleColor: oneOfType([number, string])`
			Set a color for the y axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:
	
			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex
	
			\`number\` is supported only for backwards compatability.
		`,

		yAxisTextOrientation: oneOf(['vertical', 'horizontal', 'diagonal'])`
			Determines the orientation of the tick text. This may override what the orient prop
			tries to determine.
		`,
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
		palette: chartConstants.PALETTE_7,
		xAxisField: 'x',
		xAxisFormatter: formatDate,
		xAxisTickCount: null,
		xAxisTicks: undefined,
		xAxisTitleColor: '#000',
		xAxisTextOrientation: 'horizontal',
		yAxisFields: ['y'],
		yAxisMin: 0,
		yAxisTickCount: null,
		yAxisTitle: null,
		yAxisTitleColor: '#000',
		yAxisTextOrientation: 'horizontal',
	};

	state = {
		dragging: false,
		mouseY: undefined,
	};

	static EmptyStateWrapper = EmptyStateWrapper;

	handleDrag = () => {};

	render(): React.ReactNode {
		const {
			className,
			height,
			width,
			margin: marginOriginal,
			data,
			isLoading,
			palette,
			colorMap,

			xAxisField,
			xAxisMin = minByFields(data, xAxisField) as Date,
			xAxisMax = maxByFields(data, xAxisField) as Date,
			xAxisFormatter,
			xAxisTickCount,
			xAxisTicks,
			xAxisTitle,
			xAxisTitleColor,
			xAxisTextOrientation,

			yAxisFields,
			yAxisMin,
			yAxisMax = (maxByFields(data, yAxisFields) as unknown) as number,
			yAxisFormatter,
			yAxisTickCount,
			yAxisTitle,
			yAxisTitleColor,
			yAxisTextOrientation,
			...passThroughs
		} = this.props;

		const { dragging, mouseY } = this.state;

		const margin = {
			...DraggableLineChartRAW.MARGIN,
			...marginOriginal,
		};

		const svgClasses = cx(className, '&');

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		/**
		 * Lines and Points
		 */


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

		/**
		 * y axis
		 */
		const yScale = d3Scale
			.scaleLinear()
			.domain([yAxisMin, yAxisMax])
			.range([innerHeight, 0]);

		const yAxisFinalFormatter = yAxisFormatter || yScale.tickFormat();

		return;
	}
}

export default DraggableLineChartRAW;
