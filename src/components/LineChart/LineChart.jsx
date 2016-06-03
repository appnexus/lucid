import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import {
	minByFields,
	maxByFields,
	maxByFieldsStacked,
	formatDate,
	nearest,
} from '../../util/chart-helpers';
import d3Scale from 'd3-scale';

import Axis from '../Axis/Axis';
import AxisLabel from '../AxisLabel/AxisLabel';
import Legend from '../Legend/Legend';
import Lines from '../Lines/Lines';
import Points from '../Points/Points';
import ToolTip from '../ToolTip/ToolTip';

const cx = lucidClassNames.bind('&-LineChart');

const {
	arrayOf,
	func,
	instanceOf,
	number,
	object,
	shape,
	string,
	bool,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "charts"]}
 *
 * The line chart presents data over time. Currently only dates are supported
 * on the x axis and numeric values on the y. If you need discrete values on
 * the x axis, consider using the `BarChart` instead.
 */
const LineChart = createClass({
	displayName: 'LineChart',

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Height of the chart.
		 */
		height: number,
		/**
		 * Width of the chart.
		 */
		width: number,
		/**
		 * An object defining the margins of the chart. These margins will contain
		 * the axis and labels.
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
		 *       { x: new Date('2015-01-01') , y: 1 } ,
		 *       { x: new Date('2015-01-02') , y: 2 } ,
		 *       { x: new Date('2015-01-03') , y: 3 } ,
		 *       { x: new Date('2015-01-04') , y: 2 } ,
		 *       { x: new Date('2015-01-05') , y: 5 } ,
		 *     ]
		 */
		data: arrayOf(object),
		/**
		 * An object with human readable names for fields that  will be used for
		 * tooltips. E.g:
		 *
		 *     {
		 *       x: 'Revenue',
		 *       y: 'Impressions',
		 *     }
		 *
		 */
		legend: object,
		/**
		 * Show tool tips on hover.
		 */
		hasToolTips: bool,


		/**
		 * The field we should look up your x data by. The data must be valid
		 * javascript dates.
		 */
		xAxisField: string,
		/**
		 * The minimum date the x axis should display. Typically this will be the
		 * smallest items from your dataset.
		 */
		xAxisMin: instanceOf(Date),
		/**
		 * The maximum date the x axis should display. This should almost always be
		 * the largest date from your dataset.
		 */
		xAxisMax: instanceOf(Date),
		/**
		 * An optional function used to format your x axis data. If you don't
		 * provide anything, we use the default D3 date variable formatter.
		 */
		xAxisFormatter: func,
		/**
		 * There are some cases where you need to only show a "sampling" of ticks
		 * on the x axis. This number will control that.
		 */
		xAxisTickCount: number,
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
		 * item unless you need to display multiple lines.
		 */
		yAxisFields: arrayOf(string),
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


		/**
		 * An array of your y2 axis fields. Typically this will just be a single
		 * item unless you need to display multiple lines.
		 */
		y2AxisFields: arrayOf(string),
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
		 * There are some cases where you need to only show a "sampling" of ticks
		 * on the y2 axis. This number will control that.
		 */
		y2AxisTickCount: number,
		/**
		 * Set a title for the y2 axis.
		 */
		y2AxisTitle: string,
		/**
		 * Set a color for the y2 axis title. This takes any number 0 or greater and
		 * it converts it to a color in our color palette.
		 */
		y2AxisTitleColor: number,
	},

	getDefaultProps() {
		return {
			height: 400,
			width: 1000,
			margin: {
				top: 10,
				right: 80,
				bottom: 65,
				left: 80,
			},
			legend: {},
			hasToolTips: true,

			xAxisField: 'x',
			xAxisTickCount: null,
			xAxisTitle: null,
			xAxisTitleColor: -1,

			yAxisFields: ['y'],
			yAxisIsStacked: false,
			yAxisMin: 0,
			yAxisHasPoints: true,
			yAxisTickCount: null,
			yAxisTitle: null,
			yAxisTitleColor: -1,

			y2AxisFields: null,
			y2AxisIsStacked: false,
			y2AxisHasPoints: true,
			y2AxisMin: 0,
			y2AxisTickCount: null,
			y2AxisTitle: null,
			y2AxisTitleColor: -1,
		};
	},

	getInitialState() {
		return {
			isHovering: false,
		};
	},

	render() {
		const {
			className,
			height,
			width,
			margin,
			data,
			legend,
			hasToolTips,

			xAxisField,
			xAxisTickCount,
			xAxisTitle,
			xAxisTitleColor,
			xAxisFormatter = formatDate,
			xAxisMin = minByFields(data, xAxisField),
			xAxisMax = maxByFields(data, xAxisField),

			yAxisFields,
			yAxisFormatter,
			yAxisHasPoints,
			yAxisIsStacked,
			yAxisTickCount,
			yAxisTitle,
			yAxisTitleColor,
			yAxisMin,
			yAxisMax = yAxisIsStacked
				? maxByFieldsStacked(data, yAxisFields)
				: maxByFields(data, yAxisFields),

			y2AxisFields,
			y2AxisFormatter,
			y2AxisHasPoints,
			y2AxisIsStacked,
			y2AxisTickCount,
			y2AxisTitle,
			y2AxisTitleColor,
			y2AxisMin,
			y2AxisMax = y2AxisFields && y2AxisIsStacked
				? maxByFieldsStacked(data, y2AxisFields)
				: maxByFields(data, y2AxisFields),

			...passThroughs,
		} = this.props;

		const {
			isHovering,
			mouseX,
		} = this.state;

		// TODO: Consider displaying something specific when there is no data,
		// perhaps a loading indicator.
		if (_.isEmpty(data)) {
			return (
				<svg
					{...passThroughs}
					className={cx(className, '&')}
					width={width}
					height={height}
				/>
			);
		}

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const allYFields = _.compact(yAxisFields.concat(y2AxisFields));

		const xScale = d3Scale.scaleTime()
			.domain([xAxisMin, xAxisMax])
			.range([0, innerWidth]);

		const yScale = d3Scale.scaleLinear()
			.domain([yAxisMin, yAxisMax])
			.range([innerHeight, 0]);

		const y2Scale = y2AxisFields
			? d3Scale.scaleLinear().domain([y2AxisMin, y2AxisMax]).range([innerHeight, 0])
			: null;

		const yFinalFormatter = yAxisFormatter
			? yAxisFormatter
			: yScale.tickFormat();
		const y2FinalFormatter = y2AxisFormatter
			? y2AxisFormatter
			: y2Scale
				? y2Scale.tickFormat()
				: _.identity;

		const xPointMap = _.reduce(data, (acc, d) => {
			// `floor` to avoid rounding errors, it doesn't need to be super precise
			// since we're dealing with pixels
			const point = Math.floor(xScale(d[xAxisField]));

			_.each(allYFields, (field) => {
				_.set(acc, `${point}.${field}`, d[field]);
			});

			return acc;
		}, {});
		const xPoints = _.chain(xPointMap).keys().map(_.toNumber).value();

		return (
			<svg
				{...passThroughs}
				className={cx(className, '&')}
				width={width}
				height={height}
			>

				{/* tooltips */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					{hasToolTips && isHovering && !_.isNil(mouseX) ?
						<ToolTip isExpanded={true}>
							<ToolTip.Target elementType='g'>
								<path
									className={cx('&-tooltip-line')}
									d={`M${mouseX},0 L${mouseX},${innerHeight}`}
								/>
							</ToolTip.Target>
							<ToolTip.Body>
								<Legend hasBorders={false}>
									{_.map(yAxisFields, (field, index) => (
										_.get(xPointMap, mouseX + '.' + field) ?
											<Legend.Item
												hasPoint={yAxisHasPoints}
												hasLine={true}
												color={index}
												pointKind={index}
											>
												{`${_.get(legend, field, field)}: ${yFinalFormatter(_.get(xPointMap, mouseX + '.' + field))}`}
											</Legend.Item>
										: null
									))}
									{_.map(y2AxisFields, (field, index) => (
										_.get(xPointMap, mouseX + '.' + field) ?
											<Legend.Item
												hasPoint={y2AxisHasPoints}
												hasLine={true}
												color={index + yAxisFields.length}
												pointKind={index + yAxisFields.length}
											>
												{`${_.get(legend, field, field)}: ${y2FinalFormatter(_.get(xPointMap, mouseX + '.' + field))}`}
											</Legend.Item>
										: null
									))}
								</Legend>
							</ToolTip.Body>
						</ToolTip>
					: null}
				</g>

				{/* x axis */}
				<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
					<Axis
						orient='bottom'
						scale={xScale}
						outerTickSize={0}
						tickFormat={xAxisFormatter}
						tickCount={xAxisTickCount}
						color={xAxisTitleColor}
						ref='xAxis'
					/>
				</g>

				{/* x axis title */}
				{xAxisTitle ? (
					<g transform={`translate(${margin.left}, ${margin.top + innerHeight})`}>
						<AxisLabel
							orient='bottom'
							width={innerWidth}
							height={margin.bottom}
							label={xAxisTitle}
							ref='xAxisTitle'
						/>
					</g>
				) : null}

				{/* y axis */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Axis
						orient='left'
						scale={yScale}
						tickFormat={yAxisFormatter}
						tickCount={yAxisTickCount}
						ref='yAxis'
					/>
				</g>

				{/* y axis title */}
				{yAxisTitle ? (
					<g transform={`translate(0, ${margin.top})`}>
						<AxisLabel
							orient='left'
							width={margin.left}
							height={innerHeight}
							label={yAxisTitle}
							color={yAxisTitleColor}
							ref='yAxisTitle'
						/>
					</g>
				) : null}

				{/* y2 axis */}
				{y2AxisFields ?
					<g transform={`translate(${margin.left + innerWidth}, ${margin.top})`}>
						<Axis
							orient='right'
							scale={y2Scale}
							tickFormat={y2AxisFormatter}
							tickCount={y2AxisTickCount}
							ref='y2Axis'
						/>
					</g>
				: null}

				{/* y2 axis title */}
				{y2AxisTitle ? (
					<g transform={`translate(${margin.left + innerWidth}, ${margin.top})`}>
						<AxisLabel
							orient='right'
							width={margin.right}
							height={innerHeight}
							label={y2AxisTitle}
							color={y2AxisTitleColor}
							ref='y2AxisTitle'
						/>
					</g>
				) : null}

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
					ref='yLines'
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
						ref='yPoints'
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
						ref='y2Lines'
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
						ref='y2Points'
					/>
				: null}

				{/* hover capture zone */}
				{hasToolTips ?
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<rect
							className={cx('&-tooltip-hover-zone')}
							width={innerWidth}
							height={innerHeight}
							onMouseMove={({clientX, target}) => {
								this.setState({
									isHovering: true,
									mouseX: nearest(xPoints, clientX - target.getBoundingClientRect().left),
								});
							}}
							onMouseOut={() => {
								this.setState({ isHovering: false });
							}}
						/>
					</g>
				: null}

			</svg>
		);
	},
});

export default LineChart;
