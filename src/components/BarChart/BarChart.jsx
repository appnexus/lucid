import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import {
	minByFields,
	maxByFields,
	maxByFieldsStacked,
} from '../../util/chart-helpers';
import d3Scale from 'd3-scale';

import Axis from '../Axis/Axis';
import Bars from '../Bars/Bars';

const boundClassNames = lucidClassNames.bind('&-BarChart');

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
const BarChart = React.createClass({
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
		 * The field we should look up your x data by. Your actual x data must be
		 * strings.
		 */
		xAxisField: string,
		/**
		 * It's not recommended, but there are some cases where you need to only
		 * show a "sampling" of ticks on the x axis. This number will control that.
		 */
		xAxisTickCount: number,
		/**
		 * An array of your y axis fields. Typically this will just be a single
		 * item unless you need to display grouped or stacked bars.
		 */
		yAxisFields: array.isRequired,
		/**
		 * The minimum number the y axis should display. Typically this
		 * should be be `0`.
		 */
		yAxisMin: number,
		/**
		 * The maximum number the y axis should display. This should almost always
		 * be the largest number from your dataset.
		 */
		yAxisMax: number,
		/**
		 * An optional function used to format your y axis data. If you don't
		 * provide anything, we use the default D3 number formatter.
		 */
		yAxisFormatter: func,
		/**
		 * Stack the y axis data instead of showing it as groups. This is only
		 * useful if you have multiple `yAxisFields`. Stacking will cause the chart
		 * to be aggregated by sum.
		 */
		yAxisIsStacked: bool,
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
			xAxisTickCount: null,
			yAxisFields: ['y'],
			yAxisIsStacked: false,
			yAxisMin: 0,
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
			xAxisTickCount,
			yAxisFields,
			yAxisIsStacked,
			yAxisFormatter,
			yAxisMin,
			yAxisMax = yAxisIsStacked
				? maxByFieldsStacked(data, yAxisFields)
				: maxByFields(data, yAxisFields),
			...passThroughs,
		} = this.props;

		if (_.isEmpty(data)) {
			return null;
		}

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const paddingInner = yAxisFields.length > 1 ? 0.3 : 0.05;

		const xScale = d3Scale.scaleBand()
			.domain(_.map(data, xAxisField))
			.range([0, innerWidth])
			.paddingInner(paddingInner)
			.paddingOuter(0.5);

		const yScale = d3Scale.scaleLinear()
			.domain([yAxisMin, yAxisMax])
			.range([innerHeight, 0]);

		return (
			<svg
				{...passThroughs}
				className={boundClassNames(className, '&')}
				width={width}
				height={height}
			>
				{/* Push the y axis to the right margin with a translate */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Axis
						orient='left'
						scale={yScale}
						tickFormat={yAxisFormatter}
					/>
				</g>

				{/* Push the x axis to the bottom margin with a translate */}
				<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
					<Axis
						orient='bottom'
						scale={xScale}
						outerTickSize={0}
						ordinalTickCount={xAxisTickCount}
					/>
				</g>

				{/* bars */}
				<Bars
					top={margin.top}
					left={margin.left}
					xScale={xScale}
					yScale={yScale}
					yFields={yAxisFields}
					data={data}
					isStacked={yAxisIsStacked}
				/>
			</svg>
		);
	}
});

export default BarChart;
