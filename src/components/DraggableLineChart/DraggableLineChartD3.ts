import * as d3Axis from 'd3-axis';
import { ScaleLinear, ScalePoint } from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Drag from 'd3-drag';
import * as d3Selection from 'd3-selection';
import * as d3Transition from 'd3-transition';
import ReactDOM from 'react-dom';
import * as d3Scale from 'd3-scale';
import _ from 'lodash';
import * as d3Array from 'd3-array';
import { StandardProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	IXAxisRenderProp,
	getGroup,
	lucidXAxis,
	ISelection,
} from './d3-helpers';

const cx = lucidClassNames.bind('&-DraggableLineChart');

export interface IChartData {
	x: string;
	y: number;
	ref?: any;
}
export type IOnDragEnd = (newYValue: string, xValue: string) => void;
export type IData = IChartData[];
export type ISelectedChartData = IChartData & { isSelected: boolean };
export type IOnPreselect = (data: ISelectedChartData[]) => void;

interface IDraggableLineChartMargin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

const getAttributes = function (selection: ISelection, obj: string[]): any {
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
	/** Height of the chart. */
	height?: number;

	/** Width of the chart. */
	width?: number;

	/** Margin is an object defining the margins of the chart. These margins will
	    contain the axis and labels. */
	margin?: IDraggableLineChartMargin;

	/** Data for the chart.
		Basic example:
			[
				{ x: new Date('2015-01-01') , y: 1 } ,
				{ x: new Date('2015-01-02') , y: 2 } ,
				{ x: new Date('2015-01-03') , y: 3 } ,
				{ x: new Date('2015-01-04') , y: 2 } ,
				{ x: new Date('2015-01-05') , y: 5 } ,
			]

		If you want to be able to navigate to one of the components, you can use ref as well:
			[
				{ x: new Date('2015-01-01') , y: 1, ref: React.createRef() } ,
				{ x: new Date('2015-01-02') , y: 2, ref: React.createRef() } ,
				{ x: new Date('2015-01-03') , y: 3, ref: React.createRef() } ,
				{ x: new Date('2015-01-04') , y: 2, ref: React.createRef() } ,
				{ x: new Date('2015-01-05') , y: 5, ref: React.createRef() } ,
			] 
	*/
	data: IData;

	/** Drag handler function which is a callable function executed at the end of drag.
		Called when the user stops to dragging an item.
		  Signature: `({ event, props }) => {}` */
	onDragEnd?: IOnDragEnd;

	/** Drag handler function which is a callable function executed at the end of drag.
		Called when the user stops to dragging an item.
			Signature: `({ event, props }) => {}`
	    When defined show draggable pane. 
	*/
	onPreselect?: IOnPreselect;

	/** Flag for if xAxis tick labels are vertical. */
	xAxisTicksVertical?: boolean;

	/** Flag for if data is center aligned rather than default left aligned. */
	dataIsCentered?: boolean;

	/** Flag for yAxis sticking to minimum (not readjusting minimum). */
	yAxisMin?: number;

	/** Optional react component to render within X-Axis.
		Note: If you are using input boxes or similar and you want to navigate
		to the next component on tab, you will might need to provide refs
		in the data. This react component will always be passed the following props: ({x, y, ref }: { x: string; y: number; ref?: any }) 
	*/
	xAxisRenderProp?: IXAxisRenderProp;

	/** Text to show to users when there is no data selection. */
	preSelectText?: string;

	/**
		An optional function used to format your y axis data. If you don't
		provide anything, we use the default D3 formatter.
	*/
	yAxisFormatter?: ((value: string) => string) | null;
}

interface IDraggableLineChartParams extends IDraggableLineChart {
	IDraggableLineChart?: boolean;
	cx: (d: any) => void;
	height: number;
	width: number;
	margin: IDraggableLineChartMargin;
	yAxisMin: number;
	isMouseDown?: boolean;
	mouseDownStep?: number;
	hasRenderedPoint?: boolean;
	hasRenderedLine?: boolean;
	emptyRenderProp?: () => JSX.Element;
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
				d3Array.max(this.params.data, (d: any) => d.y) || 10,
			])
			.nice()
			.range([
				this.params.height - this.params.margin.bottom,
				this.params.margin.top,
			]);
	}

	setMouseDown = (isMouseDown: boolean, mouseDownStep?: number) => {
		this.params.isMouseDown = isMouseDown;
		this.params.mouseDownStep = mouseDownStep;
	};

	getIsMouseDown = () => {
		return this.params.isMouseDown;
	};

	getMouseDownStep = () => {
		return this.params.mouseDownStep || 0;
	};

	getHasRenderedPoint = () => {
		return !!this.params.hasRenderedPoint;
	};

	getHasRenderedLine = () => {
		return !!this.params.hasRenderedLine;
	};

	setHasRenderedPoint = () => {
		this.params.hasRenderedPoint = true;
	};

	setHasRenderedLine = () => {
		this.params.hasRenderedLine = true;
	};

	shouldShowPreselect = () => {
		const hasUserValues = _.some(this.params.data, ({ y }) => y > 0);
		return !!this.params.onPreselect && !hasUserValues;
	};

	drag: any = () => {
		const { xScale, yScale, renderLine, renderPoints, selection } = this;
		const { cx, onDragEnd } = this.params;
		let initialPosition: number;
		return d3Drag
			.drag()
			.on('start', function () {
				const activeDot = d3Selection.select(this);
				initialPosition = Number(activeDot.attr('cy'));
			})
			.on('drag', function (pointData: any) {
				const [max, min] = yScale.range();
				const activeDot = d3Selection.select(this);
				// @ts-ignore
				const adjMouseY = initialPosition + d3Selection.event.y;
				const newPointY =
					adjMouseY < min ? min : adjMouseY > max ? max : adjMouseY;
				const lines = selection.selectAll(`path.${cx('&-Line')}`);

				pointData.y = Number(yScale.invert(newPointY));
				activeDot.attr('cy', newPointY);
				const line: any = d3Shape
					.line<IChartData>()
					.x((chartData: IChartData) => xScale(chartData.x) || 0)
					.y((chartData: IChartData) => yScale(chartData.y) as any);
				lines.attr('d', line);
			})
			.on('end', (d: any) => {
				if (onDragEnd) onDragEnd(d.y, d.x);
				renderLine();
				renderPoints();
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
				const { margin, cx, yAxisFormatter } = this.params;
				yAxis
					.attr('transform', `translate(${margin.left},${0})`)
					.classed(`${cx('&-Axis')}`, true)
					.transition()
					.duration(500)
					.call(
						d3Axis
							.axisLeft(this.yScale)
							.tickFormat(
								yAxisFormatter as (domainValue: any, index: number) => string
							)
					);
			})
			.call(() => yGroup);
	};
	renderLine = () => {
		if (this.shouldShowPreselect()) {
			return;
		}
		const { dataIsCentered, cx } = this.params;

		if (!this.getHasRenderedLine()) {
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
			this.setHasRenderedLine();
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
					.y((d: any) => this.yScale(d.y) as any)
			);
	};
	renderEmptyRenderProp = (height: number, width: number) => {
		const { emptyRenderProp } = this.params;
		if (!emptyRenderProp || !this.shouldShowPreselect()) {
			return;
		}

		const emptyDataObject = this.selection.selectAll('.emptyRender');
		if (emptyDataObject.empty()) {
			const emptyRender: ISelection = this.selection
				.selectAll('.overlayContainer')
				.append('foreignObject')
				.attr('height', height)
				.attr('width', width)
				.attr('x', this.params.margin.left)
				.classed('emptyRender', true);
			emptyRender.html((value: any, num: any, node: any): any => {
				ReactDOM.render(emptyRenderProp(), node[0]);
			});
		}
	};
	renderPoints = () => {
		if (this.shouldShowPreselect()) {
			return;
		}
		const { data, dataIsCentered } = this.params;
		const circle = this.getHasRenderedPoint()
			? this.selection.selectAll('circle').data(data).join('circle')
			: this.selection
					.append('g')
					.selectAll('circle')
					.data(data)
					.join('circle');

		if (dataIsCentered) {
			const innerXTickWidth = this.xScale.step();
			circle
				// @ts-ignore
				.transition()
				.duration(100)
				.attr('cx', (d: any) => this.xScale(d.x) || 0)
				.attr('cy', (d: any) => this.yScale(d.y) as any)
				.attr('r', 5)
				.attr('transform', `translate(${innerXTickWidth / 2}, 0)`)
				.style('fill', '#587EBA')
				.style('stroke', 'white')
				.style('stroke-width', 1);
		} else {
			circle
				// @ts-ignore
				.transition()
				.duration(100)
				.attr('cx', (d: any) => this.xScale(d.x) || 0)
				.attr('cy', (d: any) => this.yScale(d.y) as any)
				.attr('r', 5)
				.style('fill', '#587EBA')
				.style('stroke', 'white')
				.style('stroke-width', 1);
		}
		if (!this.getHasRenderedPoint()) circle.call(this.drag());
		this.setHasRenderedPoint();
	};

	reRenderDragBox = ({
		dragBox,
		mouseX,
		xLeft,
		xRight,
		stepWidth,
		stepCount,
	}: {
		dragBox: any;
		mouseX: number;
		xLeft: number;
		xRight: number;
		stepWidth: number;
		stepCount: number;
	}) => {
		const isLeft = xLeft >= mouseX;
		const isRight = xRight <= mouseX;
		const mouseDownStep = this.getMouseDownStep();
		if (isLeft) {
			const difference = _.max([xLeft - mouseX, 0]) || 0;
			const rawStepsSelected = Math.floor(difference / stepWidth) + 2;
			const maxStepsAvailable = mouseDownStep + 1;
			const stepsSelected = _.min([rawStepsSelected, maxStepsAvailable]) || 1;
			const activeBoxWidth = stepsSelected * stepWidth;
			const nextXLeft = xRight - activeBoxWidth;
			dragBox.attr('x', nextXLeft);
			dragBox.attr('width', activeBoxWidth);
		} else if (isRight) {
			const difference = _.max([mouseX - xRight, 0]) || 0;
			const rawStepsSelected = Math.floor(difference / stepWidth) + 2;
			const maxStepsAvailable = stepCount - mouseDownStep;
			const stepsSelected = _.min([rawStepsSelected, maxStepsAvailable]) || 1;
			const activeBoxWidth = stepsSelected * stepWidth;
			dragBox.attr('x', xLeft);
			dragBox.attr('width', activeBoxWidth);
		} else {
			dragBox.attr('x', xLeft);
			dragBox.attr('width', stepWidth);
		}
	};

	renderHoverTracker = () => {
		const {
			height,
			margin: { top, bottom },
			data,
			onPreselect,
		} = this.params;
		const {
			shouldShowPreselect,
			setMouseDown,
			getIsMouseDown,
			getMouseDownStep,
			reRenderDragBox,
			xScale,
			selection,
		} = this;
		if (!shouldShowPreselect()) {
			selection.selectAll('.overlayContainer').remove();
			return;
		}
		const innerHeight = height - top - bottom;
		const stepWidth = xScale.step();
		const stepCount = data.length;

		const overlayContainer = selection
			.append('g')
			.classed('overlayContainer', true)
			.attr('transform', `translate(${0},${top})`);

		this.renderEmptyRenderProp(innerHeight, stepCount * stepWidth);

		const overlayTrack = overlayContainer.selectAll('rect').data(data).enter();
		overlayTrack
			.append('rect')
			.attr('x', (chartData) => this.xScale(chartData.x) || 0)
			.attr('y', 0)
			.attr('width', (chartData) => this.xScale.step())
			.attr('height', innerHeight)
			.classed(cx('&-overlayTrack'), true)
			// @ts-ignore
			.on('mouseenter', (d, i, nodes) => {
				if (!getIsMouseDown()) {
					d3Selection.select(nodes[i]).classed('active', true);
				}
			})
			// @ts-ignore
			.on('mouseout', function (d, i, nodes) {
				if (!getIsMouseDown()) {
					d3Selection.select(nodes[i]).classed('active', false);
				}
			})
			.on('mousedown', function (d, i) {
				d3Selection.selectAll('.active').classed('active', false);
				const currentTarget = d3Selection.select(this);
				const { x, y, width, height }: any = getAttributes(currentTarget, [
					'x',
					'y',
					'width',
					'height',
				]);
				// @ts-ignore
				setMouseDown(true, i);
				const xLeft = +x;
				const xRight = +x + +width;
				// @ts-ignore
				const container = d3Selection.select(this.parentNode);
				container
					.append('rect')
					.attr('x', x)
					.attr('y', y)
					.attr('width', width)
					.attr('height', height)
					.classed(cx('&-overlayTrack'), true)
					.classed('active', true)
					.classed('dragBox', true)
					.on('mouseout', function () {
						// @ts-ignore
						const [mouseX] = d3Selection.mouse(this);
						const dragBox = selection.selectAll('.dragBox');
						reRenderDragBox({
							dragBox,
							mouseX,
							xLeft,
							xRight,
							stepWidth,
							stepCount,
						});
					})
					.on('mousemove', function () {
						// @ts-ignore
						const [mouseX] = d3Selection.mouse(this);
						const dragBox = selection.selectAll('.dragBox');
						reRenderDragBox({
							dragBox,
							mouseX,
							xLeft,
							xRight,
							stepWidth,
							stepCount,
						});
					})
					.on('mouseup', function () {
						const clickStep = getMouseDownStep();
						const activeBox = selection.selectAll('.dragBox');
						const { x, width } = getAttributes(activeBox, ['x', 'width']);
						const isRight = xLeft === +x;
						const steps = Math.round(+width / stepWidth);
						const startingIndex = isRight ? clickStep : clickStep - steps + 1;
						const endingIndex = startingIndex + steps - 1;
						const updatedData = data.map((step, i) => ({
							...step,
							isSelected: i >= startingIndex && i <= endingIndex,
						}));
						!!onPreselect && onPreselect(updatedData);

						setMouseDown(false);
						selection.selectAll('.dragBox').remove();
						selection.selectAll('.overlayContainer').remove();
					});
			});
	};
	renderLineChart = () => {
		this.renderXAxis();
		this.renderYAxis();
		this.renderHoverTracker();
		this.renderLine();
		this.renderPoints();
	};
	updateLineChart = (data: IData) => {
		this.params.data = data;
		this.yScale.domain([
			_.isUndefined(this.params.yAxisMin)
				? d3Array.min(this.params.data, (d: any) => d.y)
				: this.params.yAxisMin,
			d3Array.max(this.params.data, (d: any) => d.y) || 10,
		]);
		this.renderLineChart();
	};
}

export default DraggableLineChartD3;
