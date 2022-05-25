import _, { omit } from 'lodash';
import * as d3Selection from 'd3-selection';
import React from 'react';
import { Overwrite } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import DraggableLineChartD3, {
	IData,
	IDraggableLineChart,
} from './DraggableLineChartD3';

const cx = lucidClassNames.bind('&-DraggableLineChart');

const getEmptyRenderProp = (preSelectText: string) => (
	<div
		style={{
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<div className={cx('&-empty-info')}>{preSelectText}</div>
	</div>
);

export type IDraggableLineChartProps = Overwrite<
	React.SVGProps<SVGGElement>,
	IDraggableLineChart
>;

const getCleanData = (data: IData): IData => {
	return data.map(({ x, y }) => ({ x, y: Number.isFinite(y) ? y : 0 }));
};

const draggableLineChartDefaultProps = {
	height: 315,
	width: 1000,
	margin: { top: 65, right: 80, bottom: 65, left: 80 },
};

/** TODO: Remove this constant when the component is converted to a functional component */
const nonPassThroughs = [
	'height',
	'width',
	'margin',
	'data',
	'onDragEnd',
	'xAxisTicksVertical',
	'dataIsCentered',
	'yAxisMin',
	'xAxisRenderProp',
	'onPreselect',
	'preSelectText',
	'yAxisFormatter',
].concat(['initialState', 'callbackId']);

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
			onPreselect,
			preSelectText,
			yAxisFormatter = null,
		} = this.props;
		const emptyRenderProp =
			onPreselect && preSelectText
				? () => getEmptyRenderProp(preSelectText)
				: undefined;

		this.d3LineChart = new DraggableLineChartD3(svg, {
			height: height || draggableLineChartDefaultProps.height,
			width: width || draggableLineChartDefaultProps.width,
			margin: margin || draggableLineChartDefaultProps.margin,
			data: getCleanData(data),
			onDragEnd,
			xAxisTicksVertical,
			dataIsCentered,
			yAxisMin,
			yAxisFormatter,
			xAxisRenderProp,
			emptyRenderProp,
			cx,
			onPreselect,
		});
		this.d3LineChart.renderLineChart();
	}

	static displayName = 'DraggableLineChart';

	static peek = {
		description: `The \`DraggableLineChart\` is a single-lined line chart where the points on the line are draggable and will update the data real-time.`,
		categories: ['visualizations', 'charts'],
	};

	static defaultProps = draggableLineChartDefaultProps;

	render(): React.ReactNode {
		const { height, width, className, ...passThroughs } = this.props;

		return (
			<svg
				{...(omit(passThroughs, nonPassThroughs) as any)}
				ref={(ref: SVGSVGElement) => (this.ref = ref)}
				className={cx('&', className)}
				width={width}
				height={height}
			/>
		);
	}
}

export default DraggableLineChart;
