import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import {
	minByFields,
	maxByFields,
	maxByFieldsStacked,
	groupByFields,
} from '../../util/chart-helpers';
import d3Scale from 'd3-scale';
import d3Shape from 'd3-shape';

import Axis from '../Axis/Axis';
import Lines from '../Lines/Lines';
import Points from '../Points/Points';

const boundClassNames = lucidClassNames.bind('&-LineChart');

const {
	any,
	arrayOf,
	func,
	number,
	object,
	shape,
	string,
	array,
	bool,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "charts"]}
 *
 * A bar chart is a chart that presents grouped data with rectangular bars with
 * lengths proportional to the values that they represent.
 */
const LineChart = React.createClass({
	propTypes: {
		/**
		 * Classes are appended to existing classes using the `classnames` library.
		 */
		className: any,
		/**
		 * Height of the chart.
		 */
		height: number,
		/**
		 * Width of the chart.
		 */
		width: number,
		/**
		 * An object defining the margins of the chart. These margins typically
		 * contain the axis and labels.
		 */
		margin: shape({
			top: number,
			right: number,
			bottom: number,
			left: number,
		}),
		/**
		 * Data for the chart. E.g.
		 *
		 *     [
		 *       { x: 'Monday', y: 1 },
		 *       { x: 'Tuesday', y: 2 },
		 *       { x: 'Wednesday', y: 3 },
		 *       { x: 'Thursday', y: 2 },
		 *       { x: 'Friday', y: 5 },
		 *     ]
		 */
		data: arrayOf(object).isRequired,


		/**
		 * The field we should look up your x data by.
		 */
		xAxisField: string,
		/**
		 * The minimum the x axis should display. Typically this will be the
		 * smallest items from your dataset.
		 */
		xAxisMin: number,
		/**
		 * The maximum the x axis should display. This should almost always be the
		 * largest item from your dataset.
		 */
		xAxisMax: number,
		/**
		 * An optional function used to format your x axis data. If you don't
		 * provide anything, we use the default D3 formatter.
		 */
		xAxisFormatter: func,


		/**
		 * An array of your y axis fields. Typically this will just be a single
		 * item unless you need to display multiple lines.
		 */
		yAxisFields: array.isRequired,
		/**
		 * The minimum number the y axis should display. Typically this should be
		 * `0`.
		 */
		yAxisMin: number,
		/**
		 * The maximum number the y axis should display. This should almost always
		 * be the largest number from your dataset.
		 */
		yAxisMax: number,
		/**
		 * An optional function used to format your y axis data. If you don't
		 * provide anything, we use the default D3 formatter.
		 */
		yAxisFormatter: func,
		/**
		 * Stack the y axis data. This is only useful if you have multiple
		 * `yAxisFields`. Stacking will cause the chart to be aggregated by sum.
		 */
		yAxisIsStacked: bool,
		/**
		 * Display points along with the y axis lines.
		 */
		yAxisHasPoints: bool,


		/**
		 * An array of your y2 axis fields. Typically this will just be a single
		 * item unless you need to display multiple lines.
		 */
		y2AxisFields: array,
		/**
		 * The minimum number the y2 axis should display. Typically this should be
		 * `0`.
		 */
		y2AxisMin: number,
		/**
		 * The maximum number the y2 axis should display. This should almost always
		 * be the largest number from your dataset.
		 */
		y2AxisMax: number,
		/**
		 * An optional function used to format your y2 axis data. If you don't
		 * provide anything, we use the default D3 formatter.
		 */
		y2AxisFormatter: func,
		/**
		 * Stack the y2 axis data. This is only useful if you have multiple
		 * `y2AxisFields`. Stacking will cause the chart to be aggregated by sum.
		 */
		y2AxisIsStacked: bool,
		/**
		 * Display points along with the y2 axis lines.
		 */
		y2AxisHasPoints: bool,

		/**
		 * An object with human readable names for fields that is used for legend
		 * purposes. E.g:
		 *
		 *     {
		 *       x: 'Revenue',
		 *       y: 'Impressions',
		 *     }
		 *
		 * legend: object, // TODO: implement this
		 */
	},

	getDefaultProps() {
		return {
			height: 400,
			width: 1000,
			margin: {
				top: 10,
				right: 20,
				bottom: 50,
				left: 80,
			},

			xAxisField: 'x',

			yAxisFields: ['y'],
			yAxisIsStacked: false,
			yAxisMin: 0,
			yAxisHasPoints: true,

			y2AxisFields: null,
			y2AxisIsStacked: false,
			y2AxisHasPoints: true,
			y2AxisMin: 0,
		};
	},

	render() {
		const {
			className,
			height,
			width,
			margin,
			data,

			xAxisField,
			xAxisMin = minByFields(data, xAxisField),
			xAxisMax = maxByFields(data, xAxisField),

			yAxisFields,
			yAxisIsStacked,
			yAxisHasPoints,
			yAxisFormatter,
			yAxisMin,
			yAxisMax = yAxisIsStacked
				? maxByFieldsStacked(data, yAxisFields)
				: maxByFields(data, yAxisFields),

			y2AxisFields,
			y2AxisIsStacked,
			y2AxisHasPoints,
			y2AxisFormatter,
			y2AxisMin,
			y2AxisMax = y2AxisFields && y2AxisIsStacked
				? maxByFieldsStacked(data, y2AxisFields)
				: maxByFields(data, y2AxisFields),

			...passThroughs,
		} = this.props;

		if (_.isEmpty(data)) {
			return null;
		}

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const xScale = d3Scale.scaleTime()
			.domain([xAxisMin, xAxisMax])
			.range([0, innerWidth]);

		const yScale = d3Scale.scaleLinear()
			.domain([yAxisMin, yAxisMax])
			.range([innerHeight, 0]);

		const y2Scale = y2AxisFields
			? d3Scale.scaleLinear().domain([y2AxisMin, y2AxisMax]).range([innerHeight, 0])
			: null;

		return (
			<svg
				{...passThroughs}
				className={boundClassNames(className, '&')}
				width={width}
				height={height}
			>
				{/* x axis */}
				<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
					<Axis
						orient='bottom'
						scale={xScale}
						outerTickSize={0}
					/>
				</g>

				{/* y axis */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Axis
						orient='left'
						scale={yScale}
						tickFormat={yAxisFormatter}
					/>
				</g>

				{/* y2 axis */}
				{y2AxisFields ?
					<g transform={`translate(${margin.left + innerWidth}, ${margin.top})`}>
						<Axis
							orient='right'
							scale={y2Scale}
							tickFormat={y2AxisFormatter}
						/>
					</g>
				: null}

				{/* y axis lines */}
				<Lines
					top={margin.top}
					left={margin.left}
					xScale={xScale}
					yScale={yScale}
					xField={xAxisField}
					yFields={yAxisFields}
					data={data}
					isStacked={yAxisIsStacked}
				/>

				{/* y axis points */}
				{yAxisHasPoints ?
					<Points
						top={margin.top}
						left={margin.left}
						xScale={xScale}
						yScale={yScale}
						xField={xAxisField}
						yFields={yAxisFields}
						data={data}
						isStacked={yAxisIsStacked}
					/>
				: null}

				{/* y2 axis lines */}
				{y2AxisFields ?
					<Lines
						top={margin.top}
						left={margin.left}
						xScale={xScale}
						yScale={y2Scale}
						xField={xAxisField}
						yFields={y2AxisFields}
						data={data}
						isStacked={y2AxisIsStacked}
						colorOffset={1}
					/>
				: null}

				{/* y2 axis points */}
				{y2AxisFields && y2AxisHasPoints ?
					<Points
						top={margin.top}
						left={margin.left}
						xScale={xScale}
						yScale={y2Scale}
						xField={xAxisField}
						yFields={y2AxisFields}
						data={data}
						isStacked={y2AxisIsStacked}
						colorOffset={1}
					/>
				: null}
			</svg>
		);
	}
});

export default LineChart;

