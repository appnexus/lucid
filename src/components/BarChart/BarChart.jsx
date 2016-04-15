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

	componentWillMount() {
		this.configChart(this.props);
	},

	componentDidMount() {
		this._svg = this.refs['svg'];
		this._xAxis = this.refs['xAxis'];
		this._yAxis = this.refs['yAxis'];

		this.applyConfigurations();
		this.formatBars(this.props);
	},

	componentWillUpdate(nextProps) {
		this.configChart(nextProps);
	},

	componentDidUpdate() {
		this.applyConfigurations();
		this.formatBars(this.props);
	},

	// Apply the d3 axis configurations to the DOM nodes representing the x- and
	// y-axes. This method requires that the refs to these DOM nodes are already
	// stored on the instance so it cannot be called until after the initial
	// render.
	applyConfigurations() {
		d3.select(this._xAxis).call(this._xAxisConfig);
		d3.select(this._yAxis).call(this._yAxisConfig);
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

	// Create a d3 axis configuration for the x-axis. This can then be applied
	// to the actual DOM node that represents the axis.
	configXAxis(orientation, formatFunction) {
		this._xAxisConfig = d3.svg.axis()
				.scale(this._xScale)
				.orient(orientation)
				.tickFormat(formatFunction);
	},

	// Sets the x-axis scale's domain using the supplied `key` to determine the
	// values to use. The domain is the set of all those values.
	configXDomain(data, key) {
		this._xScale.domain(_.map(data, (d) => d[key]));
	},

	// Create a d3 scale for the x-axis. The `rangeRoundBands` method is used to
	// ensure that bar width is an integer.
	configXScale(width) {
		this._xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
	},

	// Create a d3 axis configuration for the y-axis. This can then be applied
	// to the actual DOM node that represents the axis.
	configYAxis(orientation, tickCount) {
		this._yAxisConfig = d3.svg.axis()
				.scale(this._yScale)
				.orient(orientation)
				.ticks(tickCount);
	},

	// Sets the y-axis scale's domain using the supplied `key` to determine the
	// data to use. The domain goes from 0 to the maximum value in the data set.
	configYDomain(data, key) {
		this._yScale.domain([0, d3.max(data, (d) => d[key])]);
	},

	// Create a d3 scale for the y-axis.
	configYScale(height) {
		this._yScale = d3.scale.linear().range([height, 0]);
	},

	// Set the dimensions and position of each bar on the chart.
	formatBars({ data, height, marginBottom, marginTop, xAxisDataKey, yAxisDataKey }) {
		const barClassName = `.${boundClassNames('&-bar')}`;
		// The `selectAll` method returns an array of nodes for each member of
		// the existing selection so the following call from the existing
		// selection of `this._svg` will return an array of length 1 that
		// contains an array of all nodes that match `barClassName`.
		const bars = _.head(d3.select(this._svg).selectAll(barClassName));

		_.forEach(data, (d, index) => {
			const x = d[xAxisDataKey];
			const y = d[yAxisDataKey];

			console.log(x, y, bars[index]);

			d3.select(bars[index])
					.attr('x', () => this._xScale(x))
					.attr('width', this._xScale.rangeBand())
					.attr('y', () => this._yScale(y))
					.attr('height', () => height - marginBottom - marginTop - this._yScale(y));
		});
	},

	render() {
		const {
			data,
			height,
			marginBottom,
			marginLeft,
			marginRight,
			marginTop,
			width,
			xAxisDataKey,
			xAxisLabel,
			yAxisLabel
		} = this.props;

		return (
			<span className={boundClassNames('&')}>
				<svg ref='svg' width={width} height={height}>
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
						{_.map(data, (d) => (
							<rect
								className={boundClassNames('&-bar')}
								key={d[xAxisDataKey]}
							/>
						))}
					</g>
				</svg>
			</span>
		);
	}
});

export default BarChart;
