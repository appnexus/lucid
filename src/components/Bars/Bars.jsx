import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { extractFields, stackByFields } from '../../util/chart-helpers';
import { createClass, omitProps } from '../../util/component-types';
import * as d3Scale from 'd3-scale';
import * as chartConstants from '../../constants/charts';
import shallowCompare from 'react-addons-shallow-compare';
import Bar from '../Bar/Bar';
import { ToolTipDumb as ToolTip } from '../ToolTip/ToolTip';
import Legend from '../Legend/Legend';

// memoizing to maintain referential equality across renders, for performance
// optimization with shallow comparison
const memoizedExtractFields = _.memoize(extractFields);
const memoizedStackByFields = _.memoize(stackByFields);

const cx = lucidClassNames.bind('&-Bars');

const { arrayOf, func, number, object, bool, string } = PropTypes;

const Bars = createClass({
	displayName: 'Bars',

	statics: {
		peek: {
			description: `
				*For use within an \`svg\`*

				Bars are typically used to represent categorical data and can be
				stacked or grouped.
			`,
			categories: ['visualizations', 'chart primitives'],
			madeFrom: ['Bar', 'ToolTip', 'Legend'],
		},
	},

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		data: arrayOf(object).isRequired`
			De-normalized data

				[
					{ x: 'one', y0: 1, y1: 2, y2: 3, y3: 5 },
					{ x: 'two', y0: 2, y1: 3, y2: 4, y3: 6 },
					{ x: 'three', y0: 2, y1: 4, y2: 5, y3: 6 },
					{ x: 'four', y0: 3, y1: 6, y2: 7, y3: 7 },
					{ x: 'five', y0: 4, y1: 8, y2: 9, y3: 8 },
				]
		`,

		legend: object`
			An object with human readable names for fields that  will be used for
			tooltips. E.g:

				{
					rev: 'Revenue',
					imps: 'Impressions',
				}
		`,

		hasToolTips: bool`
		 Show tool tips on hover.
		`,

		palette: arrayOf(string)`
			Takes one of the palettes exported from \`lucid.chartConstants\`.
			Available palettes:

			- \`PALETTE_6\` (default)
			- \`PALETTE_30\`
			- \`PALETTE_MONOCHROME_0_5\`
			- \`PALETTE_MONOCHROME_1_5\`
			- \`PALETTE_MONOCHROME_2_5\`
			- \`PALETTE_MONOCHROME_3_5\`
			- \`PALETTE_MONOCHROME_4_5\`
			- \`PALETTE_MONOCHROME_5_5\`
		`,

		colorMap: object`
			You can pass in an object if you want to map fields to
			\`lucid.chartConstants\` or custom colors:

				{
					'imps': COLOR_0,
					'rev': COLOR_3,
					'clicks': '#abc123',
				}
		`,

		xScale: func.isRequired`
			The scale for the x axis. Must be a d3 band scale. Lucid exposes the
			\`lucid.d3Scale.scaleBand\` library for use here.
		`,

		xField: string`
			The field we should look up your x data by.
		`,

		xFormatter: func`
			Function to format the x data.
		`,

		yScale: func.isRequired`
			The scale for the y axis. Must be a d3 scale. Lucid exposes the
			\`lucid.d3Scale\` library for use here.
		`,

		yFields: arrayOf(string)`
			The field(s) we should look up your y data by. Each entry represents a
			series. Your actual y data should be numeric.
		`,

		yFormatter: func`
			Function to format the y data.
		`,

		yStackedMax: number`
			Typically this number can be derived from the yScale. However when we're
			\`isStacked\` we need to calculate a new domain for the yScale based on
			the sum of the data. If you need explicit control of the y max when
			stacking, pass it in here.
		`,

		yTooltipFormatter: func`
			An optional function used to format your y axis titles and data in the
			tooltips. The first value is the name of your y field, the second value
			is your post-formatted y value, and the third value is your non-formatted
			y-value.  Signature: \`(yField, yValueFormatted, yValue) => {}\`
		`,

		isStacked: bool`
			This will stack the data instead of grouping it. In order to stack the
			data we have to calculate a new domain for the y scale that is based on
			the \`sum\` of the data.
		`,

		colorOffset: number`
			Sometimes you might not want the colors to start rotating at the blue
			color, this number will be added the bar index in determining which color
			the bars are.
		`,

		renderTooltipBody: func`
			An optional function used to format the entire tooltip body. The only arg is
			the associated data point. This formatter will over-ride yAxisTooltipFormatter
			and yAxisTooltipDataFormatter. Signature:
			\`dataPoint => {}\`
		`,
	},

	defaultTooltipFormatter(dataPoint) {
		const {
			colorMap,
			colorOffset,
			isStacked,
			legend,
			palette,
			yFields,
			yFormatter,
			yTooltipFormatter,
		} = this.props;

		return (
			<Legend hasBorders={false} isReversed={isStacked}>
				{_.map(yFields, (field, fieldIndex) => (
					<Legend.Item
						key={fieldIndex}
						hasPoint={true}
						pointKind={1}
						color={_.get(
							colorMap,
							field,
							palette[(fieldIndex + colorOffset) % palette.length]
						)}
					>
						{yTooltipFormatter(
							_.get(legend, field, field),
							yFormatter(dataPoint[field]),
							dataPoint[field]
						)}
					</Legend.Item>
				))}
			</Legend>
		);
	},

	handleMouseEnter(hoveringSeriesIndex) {
		this.setState({
			hoveringSeriesIndex,
		});
	},

	handleMouseOut() {
		this.setState({ hoveringSeriesIndex: null });
	},

	shouldComponentUpdate(...args) {
		return shallowCompare(this, ...args);
	},

	getDefaultProps() {
		return {
			hasToolTips: true,
			xField: 'x',
			xFormatter: _.identity,
			yFields: ['y'],
			yFormatter: _.identity,
			yTooltipFormatter: (yField, yValueFormatted) =>
				`${yField}: ${yValueFormatted}`,
			renderTooltipBody: null,
			isStacked: false,
			colorOffset: 0,
			palette: chartConstants.PALETTE_6,
		};
	},

	getInitialState() {
		return {
			hoveringSeriesIndex: null,
		};
	},

	render() {
		const {
			className,
			data,
			hasToolTips,
			palette,
			colorMap,
			colorOffset,
			xScale,
			xField,
			xFormatter,
			yScale: yScaleOriginal,
			yFields,
			yStackedMax,
			renderTooltipBody,
			isStacked,
			...passThroughs
		} = this.props;

		const { hoveringSeriesIndex } = this.state;

		// This scale is used for grouped bars
		const innerXScale = d3Scale
			.scaleBand()
			.domain(_.times(yFields.length))
			.range([0, xScale.bandwidth()])
			.round(true);

		// Copy the original so we can mutate it
		const yScale = yScaleOriginal.copy();

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various series' y data. One row per series.
		const transformedData = isStacked
			? memoizedStackByFields(data, yFields)
			: memoizedExtractFields(data, yFields);

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various group's y data
		if (isStacked) {
			yScale.domain([
				yScale.domain()[0],
				yStackedMax || _.max(_.map(transformedData, x => _.last(_.last(x)))),
			]);
		}

		return (
			<g {...omitProps(passThroughs, Bars)} className={cx(className, '&')}>
				{_.map(transformedData, (series, seriesIndex) => (
					<g key={seriesIndex}>
						{_.map(series, ([start, end], pointsIndex) => (
							<Bar
								key={pointsIndex}
								x={
									isStacked
										? xScale(data[seriesIndex][xField])
										: innerXScale(pointsIndex) +
											xScale(data[seriesIndex][xField])
								}
								y={yScale(end)}
								height={yScale(start) - yScale(end)}
								width={isStacked ? xScale.bandwidth() : innerXScale.bandwidth()}
								color={_.get(
									colorMap,
									yFields[pointsIndex],
									palette[(pointsIndex + colorOffset) % palette.length]
								)}
							/>
						))}

						<PureToolTip
							isExpanded={hasToolTips && hoveringSeriesIndex === seriesIndex}
							height={
								isStacked
									? yScale.range()[0] - yScale(_.last(series)[1])
									: yScale.range()[0] - yScale(_.max(_.flatten(series)))
							}
							width={xScale.bandwidth()}
							x={xScale(data[seriesIndex][xField])}
							y={yScale(_.max(_.flatten(series)))}
							series={series}
							seriesIndex={seriesIndex}
							onMouseEnter={this.handleMouseEnter}
							onMouseOut={this.handleMouseOut}
							xFormatter={xFormatter}
							xField={xField}
							renderBody={renderTooltipBody || this.defaultTooltipFormatter}
							data={data}
						/>
					</g>
				))}
			</g>
		);
	},
});

export const PureToolTip = createClass({
	_isPrivate: true,
	propTypes: {
		data: arrayOf(object),
		height: number,
		isExpanded: bool,
		onMouseEnter: func,
		onMouseOut: func,
		renderBody: func,
		seriesIndex: number,
		width: number,
		x: number,
		xField: string,
		xFormatter: func,
		y: number,
	},

	shouldComponentUpdate(...args) {
		return shallowCompare(this, ...args);
	},

	handleMouseEnter() {
		this.props.onMouseEnter(this.props.seriesIndex);
	},

	render() {
		const {
			isExpanded,
			height,
			width,
			x,
			y,
			seriesIndex,
			onMouseOut,
			renderBody,
			data,
			xFormatter,
			xField,
		} = this.props;

		return (
			<ToolTip isExpanded={isExpanded} flyOutMaxWidth="none">
				<ToolTip.Target elementType="g">
					<rect
						className={cx('&-tooltip-hover-zone')}
						height={height}
						width={width}
						x={x}
						y={y}
						onMouseEnter={this.handleMouseEnter}
						onMouseOut={onMouseOut}
					/>
				</ToolTip.Target>

				<ToolTip.Title>{xFormatter(data[seriesIndex][xField])}</ToolTip.Title>

				<ToolTip.Body>{renderBody(data[seriesIndex])}</ToolTip.Body>
			</ToolTip>
		);
	},
});

export default Bars;
