import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import {
	minByFields,
	maxByFields,
	maxByFieldsStacked,
	formatDate,
	nearest,
} from '../../util/chart-helpers';
import * as d3Scale from 'd3-scale';
import * as d3TimeFormat from 'd3-time-format';
import * as chartConstants from '../../constants/charts';

import Axis from '../Axis/Axis';
import AxisLabel from '../AxisLabel/AxisLabel';
import Legend from '../Legend/Legend';
import Lines from '../Lines/Lines';
import Points from '../Points/Points';
import { ToolTipDumb as ToolTip } from '../ToolTip/ToolTip';
import ContextMenu from '../ContextMenu/ContextMenu';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';

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
	oneOfType,
	oneOf,
} = PropTypes;

const LineChart = createClass({
	displayName: 'LineChart',

	statics: {
		peek: {
			description: `
				The line chart presents data over time. Currently only dates are
				supported on the x axis and numeric values on the y. If you need
				discrete values on the x axis, consider using the \`BarChart\` instead.
			`,
			categories: ['visualizations', 'charts'],
			madeFrom: ['ContextMenu', 'ToolTip'],
		},

		MARGIN: {
			top: 10,
			right: 80,
			bottom: 65,
			left: 80,
		},
	},

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

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

		legend: object`
			An object with human readable names for fields that will be used for
			legends and tooltips. E.g:

				{
					x: 'Date',
					y: 'Impressions',
				}
		`,

		isLoading: bool`
			Controls the visibility of the \`LoadingMessage\`.
		`,

		hasToolTips: bool`
			Show tool tips on hover.
		`,

		hasLegend: bool`
			Show a legend at the bottom of the chart.
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

		xAxisField: string`
			The field we should look up your x data by. The data must be valid
			javascript dates.
		`,

		xAxisMin: instanceOf(Date)`
			The minimum date the x axis should display. Typically this will be the
			smallest items from your dataset.
		`,

		xAxisMax: instanceOf(Date)`
			The maximum date the x axis should display. This should almost always be
			the largest date from your dataset.
		`,

		xAxisFormatter: func`
			An optional function used to format your x axis data. If you don't
			provide anything, we use the default D3 date variable formatter.
		`,

		xAxisTooltipFormatter: func`
			An optional function used to format your x axis dates in the tooltips.
		`,

		xAxisTickCount: number`
			There are some cases where you need to only show a "sampling" of ticks on
			the x axis. This number will control that.
		`,

		xAxisTicks: arrayOf(instanceOf(Date))`
			In some cases xAxisTickCount is not enough and you want to specify
			exactly where the tick marks should appear on the x axis. This prop takes
			an array of dates (currently only dates are supported for the x axis).
			This prop will override the \`xAxisTickCount\` prop.
		`,

		xAxisTitle: string`
			Set a title for the x axis.
		`,

		xAxisTitleColor: oneOfType([number, string])`
			Set a color for the x axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:

			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex

			\`number\` is supported only for backwards compatability.
		`,

		xAxisTextOrientation: oneOf(['vertical', 'horizontal', 'diagonal'])`
			Determines the orientation of the tick text. This may override what the orient prop
			tries to determine.
		`,

		yAxisFields: arrayOf(string)`
			An array of your y axis fields. Typically this will just be a single item
			unless you need to display multiple lines. The order of the array
			determines the series order in the chart.
		`,

		yAxisMin: number`
			The minimum number the y axis should display. Typically this should be
			\`0\`.
		`,

		yAxisMax: number`
			The maximum number the y axis should display. This should almost always
			be the largest number from your dataset.
		`,

		yAxisFormatter: func`
			An optional function used to format your y axis data. If you don't
			provide anything, we use the default D3 formatter.
		`,

		yAxisIsStacked: bool`
			Stack the y axis data. This is only useful if you have multiple
			\`yAxisFields\`. Stacking will cause the chart to be aggregated by sum.
		`,

		yAxisHasPoints: bool`
			Display points along with the y axis lines.
		`,

		yAxisTickCount: number`
			There are some cases where you need to only show a "sampling" of ticks on
			the y axis. This number will control that.
		`,

		yAxisTitle: string`
			Set a title for the y axis.
		`,

		yAxisTitleColor: oneOfType([number, string])`
			Set a color for the y axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:

			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex

			\`number\` is supported only for backwards compatability.
		`,

		yAxisTooltipFormatter: func`
			An optional function used to format your y axis titles and data in the
			tooltips. The first value is the name of your y field, the second value
			is your post-formatted y value, and the third value is your non-formatted
			y-value.  Signature: \`(yField, yValueFormatted, yValue) => {}\`
		`,

		yAxisTooltipDataFormatter: func`
			An optional function used to format data in the tooltips.
		`,

		yAxisColorOffset: number`
			Set the starting index where colors start rotating for points and lines
			along the y axis.
		`,

		y2AxisFields: arrayOf(string)`
			An array of your y2 axis fields. Typically this will just be a single
			item unless you need to display multiple lines. The order of the array
			determines the series order in the chart.
		`,

		y2AxisMin: number`
			The minimum number the y2 axis should display. Typically this should be
			\`0\`.
		`,

		y2AxisMax: number`
			The maximum number the y2 axis should display. This should almost always
			be the largest number from your dataset.
		`,

		y2AxisFormatter: func`
			An optional function used to format your y2 axis data. If you don't
			provide anything, we use the default D3 formatter.
		`,

		y2AxisTooltipDataFormatter: func`
			An optional function used to format data in the tooltips.
		`,

		y2AxisIsStacked: bool`
			Stack the y2 axis data. This is only useful if you have multiple
			\`y2AxisFields\`. Stacking will cause the chart to be aggregated by sum.
		`,

		y2AxisHasPoints: bool`
			Display points along with the y2 axis lines.
		`,

		y2AxisTickCount: number`
			There are some cases where you need to only show a "sampling" of ticks on
			the y2 axis. This number will control that.
		`,

		y2AxisTitle: string`
			Set a title for the y2 axis.
		`,

		y2AxisTitleColor: oneOfType([number, string])`
			Set a color for the y2 axis title. Use the color constants exported off
			\`lucid.chartConstants\`. E.g.:

			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\` // custom color hex

			\`number\` is supported only for backwards compatability.
		`,

		y2AxisColorOffset: number`
			Set the starting index where colors start rotating for points and lines
			along the y2 axis.
		`,

		yAxisTextOrientation: oneOf(['vertical', 'horizontal', 'diagonal'])`
			Determines the orientation of the tick text. This may override what the orient prop
			tries to determine.
		`,
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
			palette: chartConstants.PALETTE_6,
			hasToolTips: true,
			hasLegend: false,

			xAxisField: 'x',
			xAxisTickCount: null,
			xAxisTicks: undefined, // intentionally undefined so that `Axis` can default it correctly
			xAxisTitle: null,
			xAxisTitleColor: '#000',
			// E.g. "Mon 06/06/2016 15:46:19"
			xAxisTooltipFormatter: d3TimeFormat.timeFormat('%a %x %X'),
			xAxisTextOrientation: 'horizontal',

			yAxisFields: ['y'],
			yAxisIsStacked: false,
			yAxisMin: 0,
			yAxisHasPoints: true,
			yAxisTickCount: null,
			yAxisTitle: null,
			yAxisTitleColor: '#000',
			yAxisTooltipFormatter: (yField, yValueFormatted) =>
				`${yField}: ${yValueFormatted}`,
			yAxisColorOffset: 0,

			y2AxisFields: null,
			y2AxisIsStacked: false,
			y2AxisHasPoints: true,
			y2AxisMin: 0,
			y2AxisTickCount: null,
			y2AxisTitle: null,
			y2AxisTitleColor: '#000',
			y2AxisColorOffset: 1,
			yAxisTextOrientation: 'horizontal',
		};
	},

	getInitialState() {
		return {
			isHovering: false,
		};
	},

	components: {
		EmptyStateWrapper: EmptyStateWrapper,
	},

	handleToolTipHoverZone({ clientX, target }, xPoints) {
		const mouseX = nearest(
			xPoints,
			clientX - target.getBoundingClientRect().left
		);
		if (!this.state.isHovering || this.state.mouseX !== mouseX) {
			this.setState({
				isHovering: true,
				mouseX: nearest(xPoints, clientX - target.getBoundingClientRect().left),
			});
		}
	},

	render() {
		const {
			className,
			height,
			width,
			margin: marginOriginal,
			data,
			legend,
			isLoading,
			hasToolTips,
			hasLegend,
			palette,
			colorMap,

			xAxisField,
			xAxisTickCount,
			xAxisTicks,
			xAxisTitle,
			xAxisTitleColor,
			xAxisFormatter = formatDate,
			xAxisTooltipFormatter,
			xAxisMin = minByFields(data, xAxisField),
			xAxisMax = maxByFields(data, xAxisField),
			xAxisTextOrientation,

			yAxisFields,
			yAxisFormatter,
			yAxisHasPoints,
			yAxisIsStacked,
			yAxisTickCount,
			yAxisTitle,
			yAxisTitleColor,
			yAxisMin,
			yAxisTooltipFormatter,
			yAxisTooltipDataFormatter,
			yAxisMax = yAxisIsStacked
				? maxByFieldsStacked(data, yAxisFields)
				: maxByFields(data, yAxisFields),
			yAxisColorOffset,

			y2AxisFields,
			y2AxisFormatter,
			y2AxisTooltipDataFormatter,
			y2AxisHasPoints,
			y2AxisIsStacked,
			y2AxisTickCount,
			y2AxisTitle,
			y2AxisTitleColor,
			y2AxisMin,
			y2AxisMax = y2AxisFields && y2AxisIsStacked
				? maxByFieldsStacked(data, y2AxisFields)
				: maxByFields(data, y2AxisFields),
			y2AxisColorOffset,
			yAxisTextOrientation,

			...passThroughs
		} = this.props;

		const { isHovering, mouseX } = this.state;

		const margin = {
			...LineChart.MARGIN,
			...marginOriginal,
		};

		const svgClasses = cx(className, '&');

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const allYFields = _.compact(yAxisFields.concat(y2AxisFields));

		const xScale = d3Scale
			.scaleTime()
			.domain([xAxisMin, xAxisMax])
			.range([0, innerWidth]);

		const yScale = d3Scale
			.scaleLinear()
			.domain([yAxisMin, yAxisMax])
			.range([innerHeight, 0]);

		const y2Scale = y2AxisFields
			? d3Scale
					.scaleLinear()
					.domain([y2AxisMin, y2AxisMax])
					.range([innerHeight, 0])
			: null;

		const yAxisFinalFormatter = yAxisFormatter || yScale.tickFormat();
		const y2AxisFinalFormatter = y2AxisFormatter
			? y2AxisFormatter
			: y2Scale ? y2Scale.tickFormat() : _.identity;

		const xFinalFormatter = xAxisFormatter
			? xAxisFormatter
			: xScale.tickFormat();
		const yFinalFormatter = yAxisTooltipDataFormatter
			? yAxisTooltipDataFormatter
			: yAxisFinalFormatter;
		const y2FinalFormatter = y2AxisTooltipDataFormatter
			? y2AxisTooltipDataFormatter
			: y2AxisFinalFormatter;

		// This logic is getting a bit complicated
		const yAxisHasPointsFinal = yAxisHasPoints || yAxisIsStacked;
		const yAxisHasLinesFinal = !(yAxisIsStacked && !yAxisHasPoints);

		const y2AxisHasPointsFinal = y2AxisHasPoints || y2AxisIsStacked;
		const y2AxisHasLinesFinal = !(y2AxisIsStacked && !y2AxisHasPoints);

		// This is used to map x mouse values back to data points.
		const xPointMap = _.reduce(
			data,
			(acc, d) => {
				// `floor` to avoid rounding errors, it doesn't need to be super precise
				// since we're dealing with pixels
				const point = Math.floor(xScale(d[xAxisField]));

				_.each(allYFields, field => {
					_.set(acc, `${point}.y.${field}`, d[field]);
					_.set(acc, `${point}.x`, d[xAxisField]);
				});

				return acc;
			},
			{}
		);
		const xPoints = _.map(_.keys(xPointMap), _.toNumber);

		if (_.isEmpty(data) || width < 1 || height < 1 || isLoading) {
			const emptyStateWrapper = getFirst(
				this.props,
				LineChart.EmptyStateWrapper
			) || <LineChart.EmptyStateWrapper Title="You have no data." />;

			return (
				<EmptyStateWrapper
					{...emptyStateWrapper.props}
					isEmpty={_.isEmpty(data)}
					isLoading={isLoading}
				>
					{emptyStateWrapper.props.children}
					<svg
						{...omitProps(passThroughs, LineChart)}
						className={svgClasses}
						width={width}
						height={height}
					>
						{/* y axis */}
						<g transform={`translate(${margin.left}, ${margin.top})`}>
							<Axis
								orient="left"
								scale={yScale}
								tickFormat={yAxisFormatter}
								ref="yAxis"
							/>
						</g>
						{/* x axis */}
						<g
							transform={`translate(${margin.left}, ${innerHeight +
								margin.top})`}
						>
							<Axis
								orient="bottom"
								scale={xScale}
								tickFormat={xFinalFormatter}
								ref="xAxis"
							/>
						</g>
					</svg>
				</EmptyStateWrapper>
			);
		}

		return (
			<svg
				{...omitProps(passThroughs, LineChart)}
				className={svgClasses}
				width={width}
				height={height}
			>
				{/* tooltips */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					{hasToolTips && isHovering && !_.isNil(mouseX) ? (
						<ToolTip
							isExpanded={true}
							flyOutMaxWidth="none"
							alignment={
								mouseX < innerWidth * 0.15
									? 'start'
									: mouseX > innerWidth * 0.85 ? 'end' : 'center'
							}
						>
							<ToolTip.Target elementType="g">
								<path
									className={cx('&-tooltip-line')}
									d={`M${mouseX},0 L${mouseX},${innerHeight}`}
								/>
							</ToolTip.Target>
							<ToolTip.Title>
								{xAxisTooltipFormatter(_.get(xPointMap, `${mouseX}.x`))}
							</ToolTip.Title>
							<ToolTip.Body>
								<Legend hasBorders={false} isReversed={yAxisIsStacked}>
									{_.map(
										yAxisFields,
										(field, index) =>
											!_.isNil(_.get(xPointMap, mouseX + '.y.' + field)) ? (
												<Legend.Item
													key={index}
													hasPoint={yAxisHasPointsFinal}
													hasLine={yAxisHasLinesFinal}
													color={_.get(
														colorMap,
														field,
														palette[(index + yAxisColorOffset) % palette.length]
													)}
													pointKind={
														yAxisHasPoints ? index + yAxisColorOffset : 1
													}
												>
													{yAxisTooltipFormatter(
														_.get(legend, field, field),
														yFinalFormatter(
															_.get(xPointMap, mouseX + '.y.' + field)
														),
														_.get(xPointMap, mouseX + '.y.' + field)
													)}
												</Legend.Item>
											) : null
									)}
									{_.map(
										y2AxisFields,
										(field, index) =>
											!_.isNil(_.get(xPointMap, mouseX + '.y.' + field)) ? (
												<Legend.Item
													key={index}
													hasPoint={y2AxisHasPointsFinal}
													hasLine={y2AxisHasLinesFinal}
													color={_.get(
														colorMap,
														field,
														palette[
															y2AxisColorOffset +
																index +
																yAxisFields.length % palette.length
														]
													)}
													pointKind={
														y2AxisHasPoints
															? y2AxisColorOffset + index + yAxisFields.length
															: 1
													}
												>
													{yAxisTooltipFormatter(
														_.get(legend, field, field),
														y2FinalFormatter(
															_.get(xPointMap, mouseX + '.y.' + field)
														),
														_.get(xPointMap, mouseX + '.y.' + field)
													)}
												</Legend.Item>
											) : null
									)}
								</Legend>
							</ToolTip.Body>
						</ToolTip>
					) : null}
				</g>

				{/* x axis */}
				<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
					<Axis
						orient="bottom"
						scale={xScale}
						outerTickSize={0}
						tickFormat={xFinalFormatter}
						tickCount={xAxisTickCount}
						ticks={xAxisTicks}
						ref="xAxis"
						textOrientation={xAxisTextOrientation}
					/>

					{/* legend */}
					{hasLegend ? (
						<ContextMenu
							direction="down"
							alignment="center"
							directonOffset={
								(margin.bottom / 2 + Legend.HEIGHT / 2) *
								-1 /* should center the legend in the bottom margin */
							}
						>
							<ContextMenu.Target elementType="g">
								<rect
									className={cx('&-invisible')}
									width={innerWidth}
									height={margin.bottom}
								/>
							</ContextMenu.Target>
							<ContextMenu.FlyOut className={cx('&-legend-container')}>
								<Legend orient="horizontal">
									{_.map(yAxisFields, (field, index) => (
										<Legend.Item
											key={index}
											hasPoint={yAxisHasPointsFinal}
											hasLine={yAxisHasLinesFinal}
											color={_.get(
												colorMap,
												field,
												palette[index + yAxisColorOffset % palette.length]
											)}
											pointKind={yAxisHasPoints ? index + yAxisColorOffset : 1}
										>
											{_.get(legend, field, field)}
										</Legend.Item>
									))}
									{_.map(y2AxisFields, (field, index) => (
										<Legend.Item
											key={index}
											hasPoint={y2AxisHasPointsFinal}
											hasLine={y2AxisHasLinesFinal}
											color={_.get(
												colorMap,
												field,
												palette[
													y2AxisColorOffset +
														index +
														yAxisFields.length % palette.length
												]
											)}
											pointKind={
												y2AxisHasPoints
													? y2AxisColorOffset + index + yAxisFields.length
													: 1
											}
										>
											{_.get(legend, field, field)}
										</Legend.Item>
									))}
								</Legend>
							</ContextMenu.FlyOut>
						</ContextMenu>
					) : null}
				</g>

				{/* x axis title */}
				{xAxisTitle ? (
					<g
						transform={`translate(${margin.left}, ${margin.top + innerHeight})`}
					>
						<AxisLabel
							orient="bottom"
							width={innerWidth}
							height={margin.bottom}
							label={xAxisTitle}
							color={
								_.isString(xAxisTitleColor)
									? xAxisTitleColor
									: palette[xAxisTitleColor % palette.length]
							}
							ref="xAxisTitle"
						/>
					</g>
				) : null}

				{/* y axis */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Axis
						orient="left"
						scale={yScale}
						tickFormat={yAxisFinalFormatter}
						tickCount={yAxisTickCount}
						ref="yAxis"
						textOrientation={yAxisTextOrientation}
					/>
				</g>

				{/* y axis title */}
				{yAxisTitle ? (
					<g transform={`translate(0, ${margin.top})`}>
						<AxisLabel
							orient="left"
							width={margin.left}
							height={innerHeight}
							label={yAxisTitle}
							color={
								_.isString(yAxisTitleColor)
									? yAxisTitleColor
									: palette[yAxisTitleColor % palette.length]
							}
							ref="yAxisTitle"
						/>
					</g>
				) : null}

				{/* y2 axis */}
				{y2AxisFields ? (
					<g
						transform={`translate(${margin.left + innerWidth}, ${margin.top})`}
					>
						<Axis
							orient="right"
							scale={y2Scale}
							tickFormat={y2AxisFinalFormatter}
							tickCount={y2AxisTickCount}
							ref="y2Axis"
						/>
					</g>
				) : null}

				{/* y2 axis title */}
				{y2AxisTitle ? (
					<g
						transform={`translate(${margin.left + innerWidth}, ${margin.top})`}
					>
						<AxisLabel
							orient="right"
							width={margin.right}
							height={innerHeight}
							label={y2AxisTitle}
							color={
								_.isString(y2AxisTitleColor)
									? y2AxisTitleColor
									: palette[y2AxisTitleColor % palette.length]
							}
							ref="y2AxisTitle"
						/>
					</g>
				) : null}

				{/* y axis lines */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<Lines
						xScale={xScale}
						yScale={yScale}
						xField={xAxisField}
						yFields={yAxisFields}
						yStackedMax={yAxisMax}
						data={data}
						isStacked={yAxisIsStacked}
						colorMap={colorMap}
						palette={palette}
						colorOffset={yAxisColorOffset}
						ref="yLines"
					/>
				</g>

				{/* y axis points */}
				{yAxisHasPoints ? (
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<Points
							xScale={xScale}
							yScale={yScale}
							xField={xAxisField}
							yFields={yAxisFields}
							yStackedMax={yAxisMax}
							data={data}
							isStacked={yAxisIsStacked}
							colorMap={colorMap}
							palette={palette}
							colorOffset={yAxisColorOffset}
							ref="yPoints"
						/>
					</g>
				) : null}

				{/* y2 axis lines */}
				{y2AxisFields ? (
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<Lines
							xScale={xScale}
							yScale={y2Scale}
							xField={xAxisField}
							yFields={y2AxisFields}
							yStackedMax={y2AxisMax}
							data={data}
							isStacked={y2AxisIsStacked}
							colorOffset={y2AxisColorOffset + yAxisFields.length}
							colorMap={colorMap}
							palette={palette}
							ref="y2Lines"
						/>
					</g>
				) : null}

				{/* y2 axis points */}
				{y2AxisFields && y2AxisHasPoints ? (
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<Points
							xScale={xScale}
							yScale={y2Scale}
							xField={xAxisField}
							yFields={y2AxisFields}
							yStackedMax={y2AxisMax}
							data={data}
							isStacked={y2AxisIsStacked}
							colorOffset={y2AxisColorOffset + yAxisFields.length}
							colorMap={colorMap}
							palette={palette}
							ref="y2Points"
						/>
					</g>
				) : null}

				{/* hover capture zone */}
				{hasToolTips ? (
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<rect
							className={cx('&-invisible')}
							width={innerWidth}
							height={innerHeight}
							onMouseMove={event => {
								this.handleToolTipHoverZone(event, xPoints);
							}}
							onMouseOut={() => {
								this.setState({ isHovering: false });
							}}
						/>
					</g>
				) : null}
			</svg>
		);
	},
});

export default LineChart;
