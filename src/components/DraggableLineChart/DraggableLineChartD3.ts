import * as d3Axis from 'd3-axis';
import { ScaleLinear, ScalePoint } from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Drag from 'd3-drag';
import * as d3Selection from 'd3-selection';
import * as d3Transition from 'd3-transition';
import { d3Scale } from '../../index';
import _ from 'lodash';
import * as d3Array from 'd3-array';
import { StandardProps } from '../../util/component-types';
import {
	IXAxisRenderProp,
	getGroup,
	lucidXAxis,
	ISelection,
} from './d3-helpers';

export interface IChartData {
	x: string;
	y: number;
	ref?: any;
}
export type IOnDragEnd = (newYValue: string, xValue: string) => void;
export type IData = IChartData[];

interface IDraggableLineChartMargin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export interface IDraggableLineChart extends StandardProps {
	height?: number;
	width?: number;
	margin?: IDraggableLineChartMargin;
	data: IData;
	onDragEnd: IOnDragEnd;
	xAxisTicksVertical?: boolean;
	dataIsCentered?: boolean;
	yAxisMin?: number;
	xAxisRenderProp?: IXAxisRenderProp;
}

interface IDraggableLineChartParams extends IDraggableLineChart {
	cx: (d: any) => void;
	height: number;
	width: number;
	margin: IDraggableLineChartMargin;
	yAxisMin: number;
}

class DraggableLineChartD3 {
	selection: ISelection;
	params: IDraggableLineChartParams;
	xScale: ScalePoint<string>;
	yScale: ScaleLinear<number, number>;
	constructor(selection: ISelection, params: IDraggableLineChartParams) {
		this.selection = selection;
		this.params = params;
		if (params.dataIsCentered) {
			this.xScale = d3Scale
				.scalePoint()
				.domain([...this.params.data.map((d: any) => d.x), ''])
				.range([
					this.params.margin.left,
					this.params.width -
						this.params.margin.right -
						this.params.margin.left,
				]);
		} else {
			this.xScale = d3Scale
				.scalePoint()
				.domain(this.params.data.map((d: any) => d.x))
				.range([
					this.params.margin.left,
					this.params.width -
						this.params.margin.right -
						this.params.margin.left,
				]);
		}
		this.yScale = d3Scale
			.scaleLinear()
			.domain([
				_.isUndefined(this.params.yAxisMin)
					? d3Array.min(this.params.data, (d: any) => d.y)
					: this.params.yAxisMin,
				d3Array.max(this.params.data, (d: any) => d.y),
			])
			.nice()
			.range([
				this.params.height - this.params.margin.bottom,
				this.params.margin.top,
			]);
	}

	drag: any = () => {
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
					.line<IChartData>()
					.x((chartData: IChartData) => xScale(chartData.x) || 0)
					.y((chartData: IChartData) => yScale(chartData.y));
				lines.attr('d', line);
			})
			.on('end', (d: any) => {
				if (onDragEnd) onDragEnd(d.y, d.x);
				renderLine(false);
				renderPoints(false);
			});
	};
	renderXAxis = () => {
		const {
			margin,
			height,
			xAxisTicksVertical,
			dataIsCentered,
			cx,
			xAxisRenderProp,
		} = this.params;
		const xGroup = getGroup(this.selection, `${cx('&-Axis')}`);
		xGroup
			.call((xAxis: any) => {
				xAxis
					.attr('transform', `translate(${0},${margin.top})`)
					.call(lucidXAxis, {
						xScale: this.xScale,
						tickSize: margin.top + margin.bottom - height,
						xAxisRenderProp,
						dataIsCentered,
					});
				if (xAxisTicksVertical) {
					xAxis.classed('Vert', true);
				} else {
					xAxis.classed('NoVert', true);
				}
				if (dataIsCentered) {
					xAxis.classed('Center', true);
				}
			})
			.call(() => xGroup);
	};
	renderYAxis = () => {
		const yGroup = getGroup(this.selection, 'yAxisGroup');
		yGroup
			.call((yAxis: any) => {
				const { margin, cx } = this.params;
				yAxis
					.attr('transform', `translate(${margin.left},${0})`)
					.classed(`${cx('&-Axis')}`, true)
					.transition()
					.duration(500)
					.call(d3Axis.axisLeft(this.yScale).ticks(10));
			})
			.call(() => yGroup);
	};
	renderLine = (isNew: boolean) => {
		const { dataIsCentered, cx } = this.params;
		if (isNew) {
			if (dataIsCentered) {
				const innerXTickWidth = this.xScale.step();
				this.selection
					.append('g')
					.append('path')
					.attr('class', `${cx('&-Line')}`)
					.attr('transform', `translate(${innerXTickWidth / 2}, 0)`);
			} else {
				this.selection
					.append('g')
					.append('path')
					.attr('class', `${cx('&-Line')}`);
			}
		}
		const lines: any = this.selection.selectAll(`path.${cx('&-Line')}`);
		lines.datum(this.params.data).enter();
		lines
			.transition(d3Transition.transition().duration(100))
			.attr('fill', 'none')
			.attr(
				'd',
				d3Shape
					.line()
					.x((d: any) => this.xScale(d.x) || 0)
					.y((d: any) => this.yScale(d.y))
			);
	};
	renderPoints = (isNew: boolean) => {
		const { data, dataIsCentered } = this.params;
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

		if (dataIsCentered) {
			const innerXTickWidth = this.xScale.step();
			circle
				.transition()
				.duration(100)
				.attr('cx', (d: any) => this.xScale(d.x) || 0)
				.attr('cy', (d: any) => this.yScale(d.y))
				.attr('r', 5)
				.attr('transform', `translate(${innerXTickWidth / 2}, 0)`)
				.style('fill', '#009fdb')
				.style('stroke', 'white')
				.style('stroke-width', 1);
			if (isNew) circle.call(this.drag());
		} else {
			circle
				.transition()
				.duration(100)
				.attr('cx', (d: any) => this.xScale(d.x) || 0)
				.attr('cy', (d: any) => this.yScale(d.y))
				.attr('r', 5)
				.style('fill', '#009fdb')
				.style('stroke', 'white')
				.style('stroke-width', 1);
			if (isNew) circle.call(this.drag());
		}
	};
	renderLineChart = () => {
		this.renderXAxis();
		this.renderYAxis();
		this.renderLine(true);
		this.renderPoints(true);
	};
	updateLineChart = (data: IData) => {
		this.params.data = data;
		this.yScale.domain([
			_.isUndefined(this.params.yAxisMin)
				? d3Array.min(this.params.data, (d: any) => d.y)
				: this.params.yAxisMin,
			d3Array.max(this.params.data, (d: any) => d.y),
		]);
		this.renderXAxis();
		this.renderYAxis();
		this.renderLine(false);
		this.renderPoints(false);
	};
}

export default DraggableLineChartD3;
