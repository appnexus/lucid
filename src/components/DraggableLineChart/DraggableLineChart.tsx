import * as d3Selection from 'd3-selection';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { omitProps, Overwrite } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import DraggableLineChartD3, {
	IData,
	IDraggableLineChart,
} from './DraggableLineChartD3';

const cx = lucidClassNames.bind('&-DraggableLineChart');
const { arrayOf, number, object, shape, func, bool } = PropTypes;

export type IDraggableLineChartProps = Overwrite<
	React.SVGProps<SVGGElement>,
	IDraggableLineChart
>;

const getCleanData = (data: IData): IData => {
	return data.map(({ x, y }) => ({ x, y: Number.isFinite(y) ? y : 0 }));
};

const draggableLineChartDefaultProps = {
	height: 300,
	width: 1000,
	margin: { top: 50, right: 80, bottom: 65, left: 80 },
};

class DraggableLineChart extends React.Component<IDraggableLineChartProps, {}> {
	ref: any;
	d3LineChart: any;
	constructor(props: any) {
		super(props);
		this.ref = React.createRef();
		this.d3LineChart = null;
	}

	componentDidUpdate() {
		this.d3LineChart.updateLineChart(this.props.data);
	}
	componentDidMount() {
		const svg = d3Selection.select(this.ref);
		const {
			height,
			width,
			margin,
			data,
			onDragEnd,
			xAxisTicksVertical,
			dataIsCentered,
			yAxisMin = 0,
			xAxisRenderProp,
		} = this.props;
		this.d3LineChart = new DraggableLineChartD3(svg, {
			height: height || draggableLineChartDefaultProps.height,
			width: width || draggableLineChartDefaultProps.width,
			margin: margin || draggableLineChartDefaultProps.margin,
			data: getCleanData(data),
			onDragEnd,
			xAxisTicksVertical,
			dataIsCentered,
			yAxisMin,
			xAxisRenderProp,
			cx,
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

	static propTypes = {
		height: number`
			Height of the chart.
		`,
		width: number`
			Width of the chart.
		`,
		margin: shape({
			top: number,
			right: number,
			bottom: number,
			left: number,
		})`
		   Margin is an object defining the margins of the chart. These margins will 
		   contain the axis and labels.
		`,
		data: arrayOf(object)`
			Data for the chart. 
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
		`,
		onDragEnd: func`
			Drag handler function which is a callable function executed at the end of drag.
			Called when the user stops to dragging an item.
		  Signature: \`({ event, props }) => {}\`
		`,
		xAxisTicksVertical: bool`
			Flag for if xAxis tick labels are vertical.
		`,
		dataIsCentered: bool`
			Flag for if data is center aligned rather than default left aligned.
		`,
		yAxisMin: number`
			Flag for yAxis sticking to minimum (not readjusting minimum).
		`,
		xAxisRenderProp: func`
		  Optional react component to render within X-Axis.
			Note: If you are using input boxes or similar and you want to navigate 
			to the next component on tab, you will might need to provide refs 
			in the data. This react component will always be passed the following props: ({ x: string, y: number, ref: any })
		`,
	};
	static defaultProps = draggableLineChartDefaultProps ;

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
