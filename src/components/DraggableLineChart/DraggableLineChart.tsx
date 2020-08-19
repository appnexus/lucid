import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import {
	omitProps,
	Overwrite,
	StandardProps,
} from '../../util/component-types';
import * as d3Selection from 'd3-selection';
import { lucidClassNames } from '../../util/style-helpers';
import DraggableLineChartD3, { IData, IOnDragEnd } from './DraggableLineChartD3';
import { IXAxisRenderProp } from '../../util/d3-helpers';

const cx = lucidClassNames.bind('&-DraggableLineChart');
const { arrayOf, number, object, shape, func } = PropTypes;

interface IDraggableLineChartMargin {
	top: number;
	right: number;
	bottom: number;
	left: number;
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
	 */
	data: IData;

	/**
	 * Drag handler function which is a callable function executed at the end of drag
	 */
	onDragEnd?: IOnDragEnd;

	/**
	 * Flag for if xAxis tick labels are vertical.
	 */
	xAxisTicksVertical?: boolean;

	/**
	 * Flag for if data is center aligned rather than default left aligned.
	 */
	dataIsCentered?: boolean;

	/**
	 * Flag for yAxis sticking to minimum (not readjusting minimum)
	 */
	yAxisMin?: number;

	/**
	 * Optional react component to render within X-Axis
	 */
	xAxisRenderProp?: IXAxisRenderProp;
}

export type IDraggableLineChartProps = Overwrite<
	React.SVGProps<SVGGElement>,
	IDraggableLineChartPropsRaw
>;

const getCleanData = (data: IData): IData => {
	return data.map(({ x,y }) => ({x, y: Number.isInteger(y) ? y : 0}))
}

class DraggableLineChart extends React.Component<IDraggableLineChartProps, {}> {
	ref: any;
	d3LineChart: any;
	constructor(props: any) {
		super(props);
		this.ref = React.createRef();
		this.d3LineChart = null;
	}

	componentDidUpdate() {
		this.d3LineChart.params.data = getCleanData(this.props.data);
		this.d3LineChart.updateLineChart();
	}
	componentDidMount() {
		const svg = d3Selection.select(this.ref);
		const {
			margin,
			data,
			height,
			width,
			onDragEnd,
			xAxisTicksVertical,
			dataIsCentered,
			yAxisMin,
			xAxisRenderProp,
		} = this.props;
		this.d3LineChart = new DraggableLineChartD3(svg, {
			margin,
			data: getCleanData(data),
			height,
			width,
			onDragEnd,
			xAxisTicksVertical,
			dataIsCentered,
			yAxisMin,
			cx,
			xAxisRenderProp,
		});
		this.d3LineChart.renderLineChart();
	}

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

		onDragEnd: func`
			Called when the user stops to dragging an item.
			Signature: \`({ event, props }) => {}\`
		`,
		xAxisRenderProp: func`
		  Optional react component to render within X-Axis
		`
	};

	static defaultProps = {
		height: 300,
		width: 1000,
		margin: {
			top: 50,
			right: 80,
			bottom: 65,
			left: 80,
		},
	};

	render(): React.ReactNode {
		const { height, width, ...passThroughs } = this.props;

		return (
			<svg
				{...omitProps(
					passThroughs,
					undefined,
					_.keys(DraggableLineChart.propTypes)
				)}
				ref={(ref: SVGSVGElement) => (this.ref = ref)}
				className={cx('&')}
				width={width}
				height={height}
			/>
		);
	}
}

export default DraggableLineChart;
