import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import {
	maxByFields,
	maxByFieldsStacked,
} from '../../util/chart-helpers';
import d3Scale from 'd3-scale';

import Axis from '../Axis/Axis';
import AxisLabel from '../AxisLabel/AxisLabel';
import Bars from '../Bars/Bars';

const cx = lucidClassNames.bind('&-BarChart');

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
 * Bar charts are great for showing data that fits neatly in to "buckets". The
 * x axis data must be strings, and the y axis data must be numeric.
 */
const BarChart = createClass({
	displayName: 'BarChart',

	propTypes: {
		/**
		 * Classes are appended to root element along with existing classes using
		 * the `classnames` library.
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
		 *       { x: 'Monday'    , y: 1 } ,
		 *       { x: 'Tuesday'   , y: 2 } ,
		 *       { x: 'Wednesday' , y: 3 } ,
		 *       { x: 'Thursday'  , y: 2 } ,
		 *       { x: 'Friday'    , y: 5 } ,
		 *     ]
		 */
		data: arrayOf(object).isRequired,
		/**
		 * An object with human readable names for fields that  will be used for
		 * tooltips and legends which are *not yet implemented*. E.g:
		 *
		 *     {
		 *       x: 'Revenue',
		 *       y: 'Impressions',
		 *     }
		 *
		 * legend: object,
		 */


		/**
		 * The field we should look up your x data by. Your actual x data must be
		 * strings.
		 */
		xAxisField: string,
		/**
		 * There are some cases where you need to only show a "sampling" of ticks
		 * on the x axis. This number will control that.
		 */
		xAxisTickCount: number,
		/**
		 * An optional function used to format your x axis data. If you don't
		 * provide anything, we'll use an identity function.
		 */
		xAxisFormatter: func,
		/**
		 * Set a title for the x axis.
		 */
		xAxisTitle: string,
		/**
		 * Set a color for the x axis title. This takes any number 0 or greater and
		 * it converts it to a color in our color palette.
		 */
		xAxisTitleColor: number,


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
		 * There are some cases where you need to only show a "sampling" of ticks
		 * on the y axis. This number will control that.
		 */
		yAxisTickCount: number,
		/**
		 * Set a title for the y axis.
		 */
		yAxisTitle: string,
		/**
		 * Set a color for the y axis title. This takes any number 0 or greater and
		 * it converts it to a color in our color palette.
		 */
		yAxisTitleColor: number,
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
			xAxisTitle: null,
			xAxisTitleColor: -1,

			yAxisFields: ['y'],
			yAxisTickCount: null,
			yAxisIsStacked: false,
			yAxisMin: 0,
			yAxisTitle: null,
			yAxisTitleColor: -1,
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
			xAxisFormatter,
			xAxisTitle,
			xAxisTitleColor,
			xAxisTickCount,

			yAxisFields,
			yAxisFormatter,
			yAxisTitle,
			yAxisTitleColor,
			yAxisIsStacked,
			yAxisTickCount,
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
				className={cx(className, '&')}
				width={width}
				height={height}
			>
				{/* x axis */}
				<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
					<Axis
						orient='bottom'
						scale={xScale}
						outerTickSize={0}
						tickCount={xAxisTickCount}
						tickFormat={xAxisFormatter}
					/>
				</g>

				{/* x axis title */}
				<g transform={`translate(${margin.left}, ${margin.top + innerHeight})`}>
					{xAxisTitle ? (
						<AxisLabel
							orient='bottom'
							width={innerWidth}
							height={margin.bottom}
							label={xAxisTitle}
							color={xAxisTitleColor}
						/>
					) : null}
				</g>

				{/* y axis */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Axis
						orient='left'
						scale={yScale}
						tickFormat={yAxisFormatter}
						tickCount={yAxisTickCount}
					/>
				</g>

				{/* y axis title */}
				<g transform={`translate(0, ${margin.top})`}>
					{yAxisTitle ? (
						<AxisLabel
							orient='left'
							width={margin.left}
							height={innerHeight}
							label={yAxisTitle}
							color={yAxisTitleColor}
						/>
					) : null}
				</g>

				{/* bars */}
				<Bars
					top={margin.top}
					left={margin.left}
					xField={xAxisField}
					xScale={xScale}
					yFields={yAxisFields}
					yScale={yScale}
					data={data}
					isStacked={yAxisIsStacked}
				/>
			</svg>
		);
	}
});

export default BarChart;
