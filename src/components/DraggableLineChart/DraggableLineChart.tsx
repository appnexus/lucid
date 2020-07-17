import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
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
import * as d3Drag from 'd3-drag';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
// import * as d3TimeFormat from 'd3-time-format';
import * as chartConstants from '../../constants/charts';
// import Axis from '../Axis/Axis';
// import AxisLabel from '../AxisLabel/AxisLabel';
// import Lines from '../Lines/Lines';
// import Points from '../Points/Points';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';
import { formatDate, maxByFields, minByFields } from '../../util/chart-helpers';
import Axis from '../Axis/Axis';
import { grayscale } from 'react-syntax-highlighter/dist/styles/hljs';

const cx = lucidClassNames.bind('&-DraggableLineChart');

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

interface IDraggableLineChartMargin {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}

type yFormatterFunction = (y: number) => string;

export interface IDraggableLineChartPropsRaw extends StandardProps {
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
	margin: IDraggableLineChartMargin;

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

export type IDraggableLineChartProps = Overwrite<
	React.SVGProps<SVGGElement>,
	IDraggableLineChartPropsRaw
>;

export interface IDraggableLineChartState {
	dragging: boolean;
	mouseY?: number | string;
	adjustedYAxisData: string[];
}

class DraggableLineChart extends React.Component<
	IDraggableLineChartProps,
	IDraggableLineChartState,
	{}
> {
	// @ts-ignore
	// customDrag = function(d, y, something){
	// 	// @ts-ignore
	// 	console.log(d, y, this);
	//
	// };

	xScale = d3Scale
		.scaleTime()
		// @ts-ignore
		.domain([_.minBy(this.props.data, 'x').x, _.maxBy(this.props.data, 'x').x])
		.range([
			this.props.margin.left,
		// @ts-ignore
			this.props.width - this.props.margin.right - this.props.margin.left,
		]);

	yScale = d3Scale
		.scaleLinear()
		// @ts-ignore
		.domain([_.minBy(this.props.data, 'y').y, _.maxBy(this.props.data, 'y').y])
		.range([
		// @ts-ignore
			this.props.height - this.props.margin.bottom,
			this.props.margin.top,
		]);

	componentDidMount() {
		this.dragHandler();
	}

	componentDidUpdate(prevProps: Readonly<IDraggableLineChartProps>, prevState: Readonly<IDraggableLineChartState>, snapshot?: {}) {
		this.dragHandler();
	}

	dragHandler = () => {
		const svg = d3Selection.select('svg.sample');
		svg.append('g').call(g =>
			g
				.attr('transform', `translate(${0},${this.props.margin.top})`)
				.attr('class', 'x axis')
				.call(d3Axis.axisTop(this.xScale).ticks(7))
		); // xAxis

		svg
			.append('g')
			.call(g =>
				g
					.attr('transform', `translate(${this.props.margin.left},${0})`)
					.call(d3Axis.axisLeft(this.yScale).ticks(5, 's'))
			);

		// console.log(this.yScale(3))
		svg
			.append('path')
			.classed('lines', true)
			.datum(this.props.data)
			// @ts-ignore
			.attr('stroke', '#000000')
			.attr('fill', 'none')
			.attr(
				'd',
				// @ts-ignore
				d3Shape
					.line()
					// @ts-ignore
					.x(d => this.xScale(d.x))
					// @ts-ignore
					.y(d => this.yScale(d.y))
			)
			.enter();
		const yScale = this.yScale;
		const data = this.props.data;
		svg
			.append('g')
			.selectAll('circle')
			.data(this.props.data)
			.join('circle')
			.attr('cx', d => this.xScale(d.x))
			.attr('cy', d => this.yScale(d.y))
			.attr('r', 5)
			.style('fill', '#009fdb')
			.style('stroke', 'white')
			.style('stroke-width', 1)
			// @ts-ignore
			.call(
				// @ts-ignore
				d3Drag.drag().on(
					'drag',
					// function(d) {(this.customDrag(d, this.yScale))},
					function(d) {
						const [min, max] = yScale.range();
						if (d3Selection.event.y > min || d3Selection.event.y < max) return;
						const activeDot = d3Selection.select(this);
						activeDot.attr('cy', d3Selection.event.y);
						// @ts-ignore
						d.y = Number(yScale.invert(d3Selection.event.y).toFixed(2));
						// @ts-ignore
						console.log(d.x, d.y);
						// const lines = d3Selection.selectAll(".lines");
						// lines
						// 	.datum(data)
						// 	.attr("stroke", "#000000").attr("fill", "none").attr("d", d3.line()
						// 	.x(d => x(d.x))
						// 	.y(d => y(d.y1))
						// )
						// 	.enter();
					}
				)
			);
	};

	static displayName = 'DraggableLineChart';

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
			top: 50,
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
		adjustedYAxisData: this.props.yAxisFields,
	};

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
			...DraggableLineChart.MARGIN,
			...marginOriginal,
		};

		const svgClasses = cx(className, '&');

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		return (
			<svg
				{...omitProps(
					passThroughs,
					undefined,
					_.keys(DraggableLineChart.propTypes)
				)}
				className='sample'
				width={width}
				height={height}
			>
				{/*/!* x axis *!/*/}
				{/*<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>*/}
				{/*	<Axis*/}
				{/*		orient='bottom'*/}
				{/*		scale={xScale}*/}
				{/*		outerTickSize={0}*/}
				{/*		tickFormat={xFinalFormatter as any}*/}
				{/*		tickCount={xAxisTickCount}*/}
				{/*		ticks={xAxisTicks}*/}
				{/*		textOrientation={xAxisTextOrientation}*/}
				{/*	/>*/}
				{/*</g>*/}
			</svg>
		);
	}
}

export default DraggableLineChart;
