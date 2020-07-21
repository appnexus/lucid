import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, Overwrite, StandardProps } from '../../util/component-types';
import * as d3Scale from 'd3-scale';
// @ts-ignore
import * as d3Selection from 'd3-selection';
// @ts-ignore
import * as d3Drag from 'd3-drag';
import * as d3Shape from 'd3-shape';
// @ts-ignore
import * as d3Array from 'd3-array';
// @ts-ignore
import * as d3Axis from 'd3-axis';
import * as chartConstants from '../../constants/charts';
// import Axis from '../Axis/Axis';
// import AxisLabel from '../AxisLabel/AxisLabel';
import { formatDate } from '../../util/chart-helpers';

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
}

export type IDraggableLineChartProps = Overwrite<
	React.SVGProps<SVGGElement>,
	IDraggableLineChartPropsRaw
>;

class DraggableLineChart extends React.Component<IDraggableLineChartProps, {}> {
	xScale = d3Scale
		.scalePoint()
		// @ts-ignore
		.domain(this.props.data.map(d => d.x))
		.range([
			this.props.margin.left,
			// @ts-ignore
			this.props.width - this.props.margin.right - this.props.margin.left,
		]);

	yScale = d3Scale
		.scaleLinear()
		.domain([0, d3Array.max(this.props.data, (d: any) => d.y)])
		.nice()
		.range([
			// @ts-ignore
			this.props.height - this.props.margin.bottom,
			// @ts-ignore
			this.props.margin.top,
		]);

	componentDidMount() {
		this.renderGraph();
	}

	renderGraph = () => {
		const svg = d3Selection.select('svg.sample');
		svg.append('g').call((g: any) =>
			g
				.attr('transform', `translate(${0},${this.props.margin.top})`)
				.attr('class', 'x axis')
				.call(d3Axis.axisTop(this.xScale).tickFormat(formatDate))
		);

		svg
			.append('g')
			.call((g: any) =>
				g
					.attr('transform', `translate(${this.props.margin.left},${0})`)
					.call(d3Axis.axisLeft(this.yScale))
			);

		svg
			.append('path')
			.classed('lines', true)
			.datum(this.props.data)
			.attr('stroke', '#000000')
			.attr('fill', 'none')
			.attr(
				'd',
				d3Shape
					.line()
					.x((d: any) => this.xScale(d.x))
					.y((d: any) => this.yScale(d.y))
			)
			.enter();
		const yScale = this.yScale;
		const xScale = this.xScale;
		let initialPosition: number;
		svg
			.append('g')
			.selectAll('circle')
			.data(this.props.data)
			.join('circle')
			.attr('cx', (d: any) => this.xScale(d.x))
			.attr('cy', (d: any) => this.yScale(d.y))
			.attr('r', 5)
			.style('fill', '#009fdb')
			.style('stroke', 'white')
			.style('stroke-width', 1)
			.call(
				d3Drag
					.drag()
					.on('start', function() {
						// @ts-ignore
						const activeDot = d3Selection.select(this);
						initialPosition = Number(activeDot.attr('cy'));
					})
					.on('drag', function(d: any) {
						const [max, min] = yScale.range();
						// @ts-ignore
						const activeDot = d3Selection.select(this);
						const adjMouseY = initialPosition + d3Selection.event.y;
						if (adjMouseY > max || adjMouseY < min) return;
						d.y = Number(yScale.invert(adjMouseY));
						activeDot.attr('cy', adjMouseY);
						const lines = d3Selection.selectAll('.lines');
						lines
							.attr('stroke', '#000000')
							.attr('fill', 'none')
							.attr(
								'd',
								d3Shape
									.line()
									// @ts-ignore
									.x(d => xScale(d.x))
									// @ts-ignore
									.y(d => yScale(d.y))
							)
							.enter();
					})
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
	};

	render(): React.ReactNode {
		const {
			className,
			height,
			width,
			margin: marginOriginal,
			data,
			...passThroughs
		} = this.props;

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
			/>
		);
	}
}

export default DraggableLineChart;
