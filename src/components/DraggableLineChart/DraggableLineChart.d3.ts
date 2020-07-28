import * as d3Axis from 'd3-axis';
import { formatDate } from '../../util/chart-helpers';
import * as d3Shape from 'd3-shape';
import * as d3Drag from 'd3-drag';
import * as d3Selection from 'd3-selection';
import { d3Scale } from '../../index';
import _ from 'lodash';

interface IDraggableLineChartParams {
	margin: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	height: number;
	width: number;
	yScale: any;
	xScale: any;
	data: Array<{ [key: string]: Date | number | undefined }>;
	onDragEnd: (d: any) => any;
}

class DraggableLineChartD3 {
	selection: any;
	params: IDraggableLineChartParams = {
		margin: {
			top: 10,
			right: 80,
			bottom: 65,
			left: 80,
		},
		height: 300,
		width: 1000,
		yScale: d3Scale.scaleLinear(),
		xScale: d3Scale.scaleLinear(),
		onDragEnd: _.noop,
		data: [],
	};
	constructor(selection: any, params: IDraggableLineChartParams) {
		this.selection = selection;
		this.params = params;
	}
	renderXAxis = (cx: any) => {
		this.selection.append('g').call((xAxis: any) => {
			const { margin, xScale, height } = this.params;
			xAxis
				.attr('transform', `translate(${0},${margin.top})`)
				.attr('class', `${cx('', '&-Axis')}`)
				.classed('xAxis', true)
				.call(
					d3Axis
						.axisTop(xScale)
						// @ts-ignore
						.tickFormat(formatDate)
						.tickSize(margin.top + margin.bottom - height)
				);
		});
	};
	renderYAxis = (cx: any) => {
		this.selection.append('g').call((yAxis: any) => {
			const { margin, yScale } = this.params;
			yAxis
				.attr('transform', `translate(${margin.left},${0})`)
				.attr('class', `${cx('', '&-Axis')}`)
				.call(d3Axis.axisLeft(yScale));
		});
	};
	renderLineChart = (cx: any) => {
		this.renderXAxis(cx);
		this.renderYAxis(cx);

		this.selection
			.append('g')
			.append('path')
			.attr('class', `${cx('&-Line')}`)
			.datum(this.params.data)
			.attr('fill', 'none')
			.attr(
				'd',
				d3Shape
					.line()
					.x((d: any) => this.params.xScale(d.x))
					.y((d: any) => this.params.yScale(d.y))
			)
			.exit()
			.enter();
		const yScale = this.params.yScale;
		const xScale = this.params.xScale;
		let initialPosition: any;

		// creating Points
		const circle = this.selection
			.append('g')
			.selectAll('circle')
			.data(this.params.data);

		circle.exit().remove();
		circle
			.join('circle')
			.attr('cx', (d: any) => this.params.xScale(d.x))
			.attr('cy', (d: any) => this.params.yScale(d.y))
			.attr('r', 5)
			.style('fill', '#009fdb')
			.style('stroke', 'white')
			.style('stroke-width', 1)
			.call(
				d3Drag
					.drag()
					.on('start', function() {
						const activeDot = d3Selection.select(this);
						initialPosition = Number(activeDot.attr('cy'));
					})
					.on('drag', function(d: any) {
						const [max, min] = yScale.range();
						const activeDot = d3Selection.select(this);
						const adjMouseY = initialPosition + d3Selection.event.y;
						const newPointY =
							adjMouseY < min ? min : adjMouseY > max ? max : adjMouseY;
						const lines = d3Selection.selectAll(`.${cx('&-Line')}`);

						d.y = Number(yScale.invert(newPointY));
						activeDot.attr('cy', newPointY);
						lines
							.attr('stroke', '#000000')
							.attr('fill', 'none')
							.attr(
								'd',
								// @ts-ignore
								d3Shape
									.line()
									.x((d: any) => xScale(d.x))
									.y((d: any) => yScale(d.y))
							)
							.enter();
					})
					.on('end', this.params.onDragEnd)
			);
	};
	updateLineChart = (cx: any) => {
		const circle = this.selection.selectAll('circle').data(this.params.data);

		circle.attr('cy', (d: any) => this.params.yScale(d.y)).attr('r', 5);

		const lines = this.selection.selectAll(`.${cx('&-Line')}`);
		lines
			.attr('stroke', '#000000')
			.attr('fill', 'none')
			.attr(
				'd',
				// @ts-ignore
				d3Shape
					.line()
					.x((d: any) => this.params.xScale(d.x))
					.y((d: any) => this.params.yScale(d.y))
			)
			.enter();
	};
}

export default DraggableLineChartD3;
