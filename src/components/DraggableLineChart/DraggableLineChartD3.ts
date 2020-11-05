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
export type IOnPreselect = (data: IData) => void;
export type IData = IChartData[];

interface IDraggableLineChartMargin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

const getAttributes = function(selection: ISelection, obj: string[]): any {
	return _.reduce(
		obj,
		(acc, value) => {
			// @ts-ignore
			acc[value] = selection.attr(value);
			return acc;
		},
		{}
	);
};
export interface IDraggableLineChart extends StandardProps {
	height?: number;
	width?: number;
	margin?: IDraggableLineChartMargin;
	data: IData;
	onDragEnd: IOnDragEnd;
	onPreselect?: IOnPreselect;
	xAxisTicksVertical?: boolean;
	dataIsCentered?: boolean;
	showPreselect?: boolean;
	yAxisMin?: number;
	xAxisRenderProp?: IXAxisRenderProp;
}

interface IDraggableLineChartParams extends IDraggableLineChart {
	IDraggableLineChart?: boolean;
	cx: (d: any) => void;
	height: number;
	width: number;
	margin: IDraggableLineChartMargin;
	yAxisMin: number;
	isMouseDown: boolean;
	mouseDownX?: number;
	currentMouseX?: number;
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

	setMouseDown = (x: number) => {
		this.params.mouseDownX = x;
		this.params.isMouseDown = true;
	};

	setCurrentMouseX = (x: number) => {
		this.params.currentMouseX = x;
	};
	getIsMouseDown = () => {
		return this.params.isMouseDown;
	};

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
			data,
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
						data,
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
				.style('fill', '#587EBA')
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
				.style('fill', '#587EBA')
				.style('stroke', 'white')
				.style('stroke-width', 1);
			if (isNew) circle.call(this.drag());
		}
	};

	renderHoverTracker = () => {
		const {
			height,
			margin: { top, bottom },
			data,
			onPreselect,
			showPreselect,
		} = this.params;
		const { setMouseDown, getIsMouseDown, setCurrentMouseX } = this;
		const hasNoUserValues = _.every(data, ({ y }) => _.isEmpty(y));
		const { xScale, renderLine, renderPoints, selection } = this;
		if (!showPreselect || !hasNoUserValues) {
			selection.selectAll('.overlayContainer').remove();
			return;
		}
		const innerHeight = height - top - bottom;
		const overlayContainer = selection
			.append('g')
			.classed('overlayContainer', true)
			.attr('transform', `translate(${0},${top})`);

		const overlayTrack = overlayContainer
			.selectAll('rect')
			.data(data)
			.enter();
		overlayTrack
			.append('rect')
			.attr('x', chartData => this.xScale(chartData.x) || 0)
			.attr('y', 0)
			.attr('width', chartData => this.xScale.step())
			.attr('height', innerHeight)
			.classed('overlayTrack', true)
			.on('mouseenter', (d, i, nodes) => {
				d3Selection.select(nodes[i]).classed('active', true);
			})
			.on('mouseout', function(d, i, nodes) {
				d3Selection.select(nodes[i]).classed('active', getIsMouseDown());
			//	Can be removed
			})
			.on('mousedown', function() {
				const currentTarget = d3Selection.select(this);
				const { x } = getAttributes(currentTarget, ['x']);
				setMouseDown(x);
			})
			.on('mouseup', function() {
				const activeBox = d3Selection.select(this);
				const { x, width } = getAttributes(activeBox, ['x', 'width']);
				const range = xScale.range();
				const rangePoints = d3Array.range(range[0], range[1], xScale.step());
				const avg = 100 / (width / xScale.step());
				_.reduce(
					rangePoints,
					(acc, d, i) => {
						if (_.inRange(+d, x, +x + +width)) {
							acc[i].y = +avg;
						}
						return acc;
					},
					data
				);

				renderLine(false);
				renderPoints(false);

				!!onPreselect && onPreselect(data);
				overlayContainer.remove();
			})
			.on('mousemove', function() {
				const [currentX] = d3Selection.mouse(this);
				// TODO: Lance, we stopped here. we need to move all loging on
				// const showActive = (is current box x position between. Mouse start. x and current mouse x
				setCurrentMouseX(currentX);
			});
	};
	renderLineChart = () => {
		this.renderXAxis();
		this.renderYAxis();
		this.renderHoverTracker();
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
		this.renderHoverTracker();
		this.renderLine(false);
		this.renderPoints(false);
	};
}

export default DraggableLineChartD3;
