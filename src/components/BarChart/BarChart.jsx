import _ from 'lodash';
import d3 from 'd3';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-BarChart');

const BOTTOM = 'bottom';
const LEFT = 'left';
const RIGHT = 'right';
const TOP = 'top';

const {
	arrayOf,
	func,
	number,
	object,
	oneOf,
	oneOfType,
	string
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "charts"]}
 *
 * Fashion axe mixtape vegan shoreditch put a bird on it selvage banh mi franzen
 * mlkshk. Polaroid PBR&B organic, salvia asymmetrical kogi drinking vinegar
 * listicle master cleanse forage kitsch skateboard. Narwhal pitchfork VHS pork
 * belly hoodie butcher street art. Waistcoat cred semiotics williamsburg,
 * biodiesel neutra messenger bag quinoa hoodie forage kinfolk blue bottle tote
 * bag fingerstache. Gluten-free kickstarter helvetica, pabst taxidermy artisan
 * umami chillwave authentic literally food truck swag gochujang meditation.
 */
const BarChart = React.createClass({
	propTypes: {
		/**
		 * The data points for the chart.
		 */
		data: arrayOf(object),

		/**
		 * The height of the SVG on which the chart is drawn.
		 */
		height: number,

		/**
		 * The margin between the bottom of the SVG and the bottom of the
		 * rendered chart. NOTE: Axis labels will be rendered within this area.
		 */
		marginBottom: oneOfType([
			number,
			string
		]),

		/**
		 * The margin between the left of the SVG and the left of the rendered
		 * chart. NOTE: Axis labels will be rendered within this area.
		 */
		marginLeft: oneOfType([
			number,
			string
		]),

		/**
		 * The margin between the right of the SVG and the right of the rendered
		 * chart. NOTE: Axis labels will be rendered within this area.
		 */
		marginRight: oneOfType([
			number,
			string
		]),

		/**
		 * The margin between the top of the SVG and the top of the rendered
		 * chart. NOTE: Axis labels will be rendered within this area.
		 */
		marginTop: oneOfType([
			number,
			string
		]),

		/**
		 * The width of the SVG on which the chart is drawn.
		 */
		width: number,

		/**
		 * The key of the data field that should be associated with the x-axis.
		 */
		xAxisDataKey: string.isRequired,

		/**
		 * The formatting function used to format the values along the x-axis.
		 * The function should take a number as its only parameter and return a
		 * string that represents how the number should be displayed.
		 */
		xAxisFormatFunction: func,

		/**
		 * Rendered along the x-axis to identify what that data represents.
		 */
		xAxisLabel: string,

		/**
		 * Indicates whether the x-axis should appear at the top or bottom of
		 * the chart.
		 */
		xAxisOrientation: oneOf([
			BOTTOM,
			TOP
		]),

		/**
		 * The key of the data field that should be associated with the y-axis.
		 */
		yAxisDataKey: string.isRequired,

		/**
		 * Rendered along the y-axis to identify what that data represents.
		 */
		yAxisLabel: string,

		/**
		 * Indicates whether the y-axis should appear on the left or right side
		 * of the chart.
		 */
		yAxisOrientation: oneOf([
			LEFT,
			RIGHT
		]),

		/**
		 * The number of tick marks that should appear on the y-axis.
		 */
		yAxisTickCount: number
	},

	getDefaultProps() {
		return {
			data: [],
			height: 480,
			marginBottom: 50,
			marginLeft: 50,
			marginRight: 20,
			marginTop: 20,
			width: 640,
			xAxisFormatFunction: _.identity,
			xAxisLabel: '',
			xAxisOrientation: BOTTOM,
			yAxisLabel: '',
			yAxisOrientation: LEFT,
			yAxisTickCount: 10
		};
	},

	componentDidMount() {
		this._xAxis = this.refs['xAxis'];
		this._yAxis = this.refs['yAxis'];

		this.configChart(this.props);

		d3.select(this._xAxis)
				.call(this._xAxisConfig)
				.selectAll('.tick text')
						.attr('dy', '.75em');
		d3.select(this._yAxis)
				.call(this._yAxisConfig);
	},

	componentWillReceiveProps(nextProps) {
		this.configChart(nextProps);
	},

	configChart({
		data,
		height,
		marginBottom,
		marginLeft,
		marginRight,
		marginTop,
		width,
		xAxisDataKey,
		xAxisFormatFunction,
		xAxisOrientation,
		yAxisDataKey,
		yAxisOrientation,
		yAxisTickCount
	}) {
		this.configXScale(width - marginLeft - marginRight);
		this.configYScale(height - marginBottom - marginTop);

		this.configXAxis(xAxisOrientation, xAxisFormatFunction);
		this.configYAxis(yAxisOrientation, yAxisTickCount);

		this.configXDomain(data, xAxisDataKey);
		this.configYDomain(data, yAxisDataKey);
	},

	configXAxis(orientation, formatFunction) {
		this._xAxisConfig = d3.svg.axis()
				.scale(this._xScale)
				.orient(orientation)
				.tickFormat(formatFunction);
	},

	configXDomain(data, key) {
		this._xScale.domain(_.map(data, (d) => d[key]));
	},

	configXScale(width) {
		this._xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
	},

	configYAxis(orientation, tickCount) {
		this._yAxisConfig = d3.svg.axis()
				.scale(this._yScale)
				.orient(orientation)
				.ticks(tickCount);
	},

	configYDomain(data, key) {
		this._yScale.domain([0, d3.max(data, (d) => d[key])]);
	},

	configYScale(height) {
		this._yScale = d3.scale.linear().range([height, 0]);
	},

	render() {
		const {
			height,
			marginBottom,
			marginLeft,
			marginRight,
			marginTop,
			width,
			xAxisLabel,
			yAxisLabel
		} = this.props;

		return (
			<span className={boundClassNames('&')}>
				<svg width={width} height={height}>
					<g style={{
						transform: `translate(${marginLeft}px, ${marginTop}px)`
					}}>
						<g
							className={boundClassNames('&-x-axis', 'x', 'axis')}
							ref='xAxis'
							style={{
								transform: `translate(0, ${height - marginBottom - marginTop}px)`
							}}
						>
							<text
								className={boundClassNames('&-x-axis-label')}
								dx={(width - marginLeft - marginRight) / 2}
								dy='2.5em'
							>{xAxisLabel}</text>
						</g>
						<g
							className={boundClassNames('&-y-axis', 'y', 'axis')}
							ref='yAxis'
						>
							<text
								className={boundClassNames('&-y-axis-label')}
								dy='-2.5em'
								dx={-(height - marginBottom - marginTop) / 2}
								y='6'
							>{yAxisLabel}</text>
						</g>
					</g>
				</svg>
			</span>
		);
	}
});

export default BarChart;
