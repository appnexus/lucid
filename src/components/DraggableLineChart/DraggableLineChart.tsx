import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import {
	omitProps,
	Overwrite,
	StandardProps,
} from '../../util/component-types';
import * as d3Scale from 'd3-scale';
import * as d3Selection from 'd3-selection';
import * as d3Drag from 'd3-drag';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { formatDate } from '../../util/chart-helpers';

const {
	arrayOf,
	number,
	object,
	shape,
} = PropTypes;

interface IDraggableLineChartMargin {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}

export interface IDraggableLineChartPropsRaw extends StandardProps {
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
				// @ts-ignore
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
				// @ts-ignore
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
				// @ts-ignore
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
								// @ts-ignore
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
			height,
			width,
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
