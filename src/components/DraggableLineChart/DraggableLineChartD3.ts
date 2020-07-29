import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3Drag from 'd3-drag';
import * as d3Selection from 'd3-selection';
import * as d3Transition from 'd3-transition';
import { d3Scale } from '../../index';
import _ from 'lodash';
import * as d3Array from 'd3-array';

interface ChartData {
	x: Date | string | number | undefined;
	y: Date | string | number | undefined;
}

interface IDraggableLineChartParams {
	margin: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	height: number;
	width: number;
	data: Array<{ [key: string]: Date | string | number | undefined }>;
	onDragEnd?: (d: any) => any;
	cx: (d: any) => void;
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
		onDragEnd: _.noop,
		data: [],
		cx: _.noop,
	};
	xScale: any;
	yScale: any;
	constructor(selection: any, params: IDraggableLineChartParams) {
		this.selection = selection;
		this.params = params;
		this.xScale = d3Scale
			.scalePoint()
			.domain(this.params.data.map((d: any) => d.x))
			.range([
				this.params.margin.left,
				this.params.width - this.params.margin.right - this.params.margin.left,
			]);
		this.yScale = d3Scale
			.scaleLinear()
			.domain([0, d3Array.max(this.params.data, (d: any) => d.y)])
			.nice()
			.range([
				this.params.height - this.params.margin.bottom,
				this.params.margin.top,
			]);
	}

	drag = () => {
		const { xScale, yScale, renderLine, renderPoints, selection } = this;
		const { cx, onDragEnd } = this.params;
		let initialPosition: number;
		return d3Drag
			.drag()
			.on('start', function() {
				const activeDot = d3Selection.select(this);
				initialPosition = Number(activeDot.attr('cy'));
			})
			.on('drag', function(pointData: any) {
				const [max, min] = yScale.range();
				const activeDot = d3Selection.select(this);
				const adjMouseY = initialPosition + d3Selection.event.y;
				const newPointY =
					adjMouseY < min ? min : adjMouseY > max ? max : adjMouseY;
				const lines = selection.selectAll(`path.${cx('&-Line')}`);

				pointData.y = Number(yScale.invert(newPointY));
				activeDot.attr('cy', newPointY);
				const line: any = d3Shape
					.line<ChartData>()
					.x((chartData: ChartData) => xScale(chartData.x))
					.y((chartData: ChartData) => yScale(chartData.y));
				lines.attr('d', line);
			})
			.on('end', d => {
				if (onDragEnd) onDragEnd(d);
				renderLine(false);
				renderPoints(false);
			});
	};
	renderXAxis = () => {
		this.selection.append('g').call((xAxis: any) => {
			const { margin, height, cx } = this.params;
			xAxis
				.attr('transform', `translate(${0},${margin.top})`)
				.classed(`${cx('&-Axis')}`, true)
				.classed('xAxis', true)
				.call(
					d3Axis
						.axisTop(this.xScale)
						.tickSize(margin.top + margin.bottom - height)
				);
		});
	};
	renderYAxis = () => {
		let yAxisGroup = this.selection.selectAll('.yAxisGroup');
		if (yAxisGroup.empty()) {
			yAxisGroup = this.selection.append('g').classed('yAxisGroup', true);
		}
		yAxisGroup.call((yAxis: any) => {
			const { margin, cx } = this.params;
			yAxis
				.attr('transform', `translate(${margin.left},${0})`)
				.classed(`${cx('&-Axis')}`, true)
				.transition()
				.duration(500)
				.call(d3Axis.axisLeft(this.yScale).ticks(10));
		});
	};
	renderLine = (isNew: boolean) => {
		const { cx } = this.params;
		if (isNew) {
			this.selection
				.append('g')
				.append('path')
				.attr('class', `${cx('&-Line')}`);
		}
		const lines = this.selection.selectAll(`path.${cx('&-Line')}`);
		lines.datum(this.params.data).enter();
		lines
			.transition(d3Transition.transition().duration(500))
			.attr('fill', 'none')
			.attr(
				'd',
				d3Shape
					.line()
					.x((d: any) => this.xScale(d.x))
					.y((d: any) => this.yScale(d.y))
			);
	};
	renderPoints = (isNew: boolean) => {
		const { data } = this.params;
		const circle = isNew
			? this.selection
					.append('g')
					.selectAll('circle')
					.data(data)
					.join('circle')
			: this.selection
					.selectAll('circle')
					.data(data)
					.join('circle');

		circle
			.transition()
			.duration(500)
			.attr('cx', (d: any) => this.xScale(d.x))
			.attr('cy', (d: any) => this.yScale(d.y))
			.attr('r', 5)
			.style('fill', '#009fdb')
			.style('stroke', 'white')
			.style('stroke-width', 1);
		if (isNew) circle.call(this.drag());
	};
	renderLineChart = () => {
		this.renderXAxis();
		this.renderYAxis();
		this.renderLine(true);
		this.renderPoints(true);
	};
	updateLineChart = () => {
		this.yScale.domain([
			d3Array.min(this.params.data, (d: any) => d.y),
			d3Array.max(this.params.data, (d: any) => d.y),
		]);
		this.renderLine(false);
		this.renderPoints(false);
		this.renderYAxis();
	};
}

export default DraggableLineChartD3;
