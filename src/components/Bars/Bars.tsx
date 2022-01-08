import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as d3Scale from 'd3-scale';

import { lucidClassNames } from '../../util/style-helpers';
import {
	Collection,
	extractFields,
	stackByFields,
} from '../../util/chart-helpers';
import { StandardProps } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';
import Bar from '../Bar/Bar';
import { ToolTipDumb as ToolTip } from '../ToolTip/ToolTip';
import Legend from '../Legend/Legend';

// memoizing to maintain referential equality across renders, for performance
// optimization with shallow comparison
const memoizedExtractFields = _.memoize(extractFields);
const memoizedStackByFields = _.memoize(stackByFields);

const cx = lucidClassNames.bind('&-Bars');

const { arrayOf, func, number, object, bool, string } = PropTypes;

export interface IBarsProps extends StandardProps {
	/**
	 * De-normalized data
	 *
	 * [
	 * 	{ x: 'one', y0: 1, y1: 2, y2: 3, y3: 5 },
	 * 	{ x: 'two', y0: 2, y1: 3, y2: 4, y3: 6 },
	 * 	{ x: 'three', y0: 2, y1: 4, y2: 5, y3: 6 },
	 * 	{ x: 'four', y0: 3, y1: 6, y2: 7, y3: 7 },
	 * 	{ x: 'five', y0: 4, y1: 8, y2: 9, y3: 8 },
	 * ]
	 */
	data: Collection;

	/**
	 * 	An object with human readable names for fields that  will be used for tooltips. E.g:
	 * 	{
	 * 		rev: 'Revenue',
	 * 		imps: 'Impressions',
	 * 	}
	 */
	legend?: object;

	/** Show tool tips on hover. Default is true. */
	hasToolTips: boolean;

	/**
	 * 	Takes one of the palettes exported from \`lucid.chartConstants\`.
	 * Available palettes:
	 * - \`PALETTE_7\` (default)
	 * - \`PALETTE_30\`
	 * - \`PALETTE_MONOCHROME_0_5\`
	 * - \`PALETTE_MONOCHROME_1_5\`
	 * - \`PALETTE_MONOCHROME_2_5\`
	 * - \`PALETTE_MONOCHROME_3_5\`
	 * - \`PALETTE_MONOCHROME_4_5\`
	 * - \`PALETTE_MONOCHROME_5_5\`
	 * - \`PALETTE_MONOCHROME_6_5\`
	 */
	palette: string[];

	/**
	 * You can pass in an object if you want to map fields to `lucid.chartConstants\`
	 * or custom colors:
	 * {
	 * 	'imps': COLOR_0,
	 * 	'rev': COLOR_3,
	 * 	'clicks': '#abc123',
	 * }
	 *
	 */
	colorMap?: object;

	/** The scale for the x axis.
	 * Must be a d3 band scale.
	 * Lucid exposes the\`lucid.d3Scale.scaleBand\` library for use here.
	 */
	//xScale: (x: string) => number | undefined;
	xScale:
		| d3Scale.ScaleBand<string>
		| d3Scale.ScaleBand<number>
		| d3Scale.ScalePoint<string>;

	/** The field we should look up your x data by.*/
	xField: string;

	/** Function to format the x data. */
	xFormatter: (d: Date) => string;

	/** The scale for the y axis. Is required.
	 * Must be a d3 scale.
	 * Lucid exposes the \`lucid.d3Scale\` library for use here.
	 * */
	yScale:
		| d3Scale.ScaleBand<string | number>
		| d3Scale.ScalePoint<string | number>
		| d3Scale.ScaleLinear<number, number>;

	/** The field(s) we should look up your y data by.
	 * Each entry represents a series.
	 * The actual y data should be numeric. */
	yFields: string[];

	/** Function to format the y data.
	 * Signature yFormatter(dataPoint[field], dataPoint),
	 */
	yFormatter: (
		y: string | number,
		dataPoint: { [key: string]: string | number }
	) => string;

	/** Typically this number can be derived from the yScale.
	 * However when we're \`isStacked\` we need to calculate a new domain for the yScale
	 * based on the sum of the data.
	 * If you need explicit control of the y max when stacking, pass it in here. */
	yStackedMax?: number;

	/** An optional function used to format your y axis titles and data in the tooltips.
	 * The first value is the name of your y field,
	 * the second value is your post-formatted y value,
	 * and the third value is your non-formatted y-value.
	 * Signature: \`(yField, yValueFormatted, yValue) => {}\`
	 * */
	// (yField, yValueFormatted) => `${yField}: ${yValueFormatted}`,
	yTooltipFormatter: (
		yField: string,
		yValueFormatted: string | number,
		yValue: number
	) => string | number;

	/** This will stack the data instead of grouping it.
	 * In order to stack the data we have to calculate a new domain for the y scale
	 * that is based on the \`sum\` of the data. */
	isStacked: boolean;

	/** Sometimes you might not want the colors to start rotating at the blue color,
	 * this number will be added the bar index in determining which color the bars are. */
	colorOffset: number;

	/** An optional function used to format the entire tooltip body.
	 * The only arg is the associated data point.
	 * This formatter will over-ride yTooltipFormatter and yAxisTooltipDataFormatter.
	 * Signature: \`dataPoint => {}\`
	 */
	renderTooltipBody: (dataPoint: number | string | object) => {};
}

interface IBarsState {
	hoveringSeriesIndex: null | number;
}

/** TODO: Remove this constant when the component is converted to a functional component */
const nonPassThroughs = [
	'className',
	'data',
	'legend',
	'hasToolTips',
	'palette',
	'colorMap',
	'xScale',
	'xField',
	'xFormatter',
	'yScale',
	'yFields',
	'yFormatter',
	'yStackedMax',
	'yTooltipFormatter',
	'isStacked',
	'colorOffset',
	'renderTooltipBody',
];

export class Bars extends PureComponent<IBarsProps, IBarsState> {
	static displayName = 'Bars';

	static peek = {
		description: `For use within an \`svg\`. \`Bars\` are typically used to represent categorical data and can be stacked or grouped.`,
		categories: ['visualizations', 'chart primitives'],
		madeFrom: ['Bar', 'ToolTip', 'Legend'],
	};

	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			De-normalized data

				[
					{ x: 'one', y0: 1, y1: 2, y2: 3, y3: 5 },
					{ x: 'two', y0: 2, y1: 3, y2: 4, y3: 6 },
					{ x: 'three', y0: 2, y1: 4, y2: 5, y3: 6 },
					{ x: 'four', y0: 3, y1: 6, y2: 7, y3: 7 },
					{ x: 'five', y0: 4, y1: 8, y2: 9, y3: 8 },
				]
		*/
		data: arrayOf(object).isRequired,

		/**
			An object with human readable names for fields that  will be used for
			tooltips. E.g:

				{
					rev: 'Revenue',
					imps: 'Impressions',
				}
		*/
		legend: object,

		/**
		 * Show tool tips on hover.
		 */
		hasToolTips: bool,

		/**
			Takes one of the palettes exported from \`lucid.chartConstants\`.
			Available palettes:

			- \`PALETTE_7\` (default)
			- \`PALETTE_30\`
			- \`PALETTE_MONOCHROME_0_5\`
			- \`PALETTE_MONOCHROME_1_5\`
			- \`PALETTE_MONOCHROME_2_5\`
			- \`PALETTE_MONOCHROME_3_5\`
			- \`PALETTE_MONOCHROME_4_5\`
			- \`PALETTE_MONOCHROME_5_5\`
			- \`PALETTE_MONOCHROME_6_5\`
		*/
		palette: arrayOf(string),

		/**
			You can pass in an object if you want to map fields to
			\`lucid.chartConstants\` or custom colors:

				{
					'imps': COLOR_0,
					'rev': COLOR_3,
					'clicks': '#abc123',
				}
		*/
		colorMap: object,

		/**
			The scale for the x axis. Must be a d3 band scale. Lucid exposes the
			\`lucid.d3Scale.scaleBand\` library for use here.
		*/
		xScale: func.isRequired,

		/**
			The field we should look up your x data by.
		*/
		xField: string,

		/**
			Function to format the x data.
		*/
		xFormatter: func,

		/**
			The scale for the y axis. Must be a d3 scale. Lucid exposes the
			\`lucid.d3Scale\` library for use here.
		*/
		yScale: func.isRequired,

		/**
			The field(s) we should look up your y data by. Each entry represents a
			series. Your actual y data should be numeric.
		*/
		yFields: arrayOf(string),

		/**
			Function to format the y data.
		*/
		yFormatter: func,

		/**
			Typically this number can be derived from the yScale. However when we're
			\`isStacked\` we need to calculate a new domain for the yScale based on
			the sum of the data. If you need explicit control of the y max when
			stacking, pass it in here.
		*/
		yStackedMax: number,

		/**
			An optional function used to format your y axis titles and data in the
			tooltips. The first value is the name of your y field, the second value
			is your post-formatted y value, and the third value is your non-formatted
			y-value.  Signature: \`(yField, yValueFormatted, yValue) => {}\`
		*/
		yTooltipFormatter: func,

		/**
			This will stack the data instead of grouping it. In order to stack the
			data we have to calculate a new domain for the y scale that is based on
			the \`sum\` of the data.
		*/
		isStacked: bool,

		/**
			Sometimes you might not want the colors to start rotating at the blue
			color, this number will be added the bar index in determining which color
			the bars are.
		*/
		colorOffset: number,

		/**
			An optional function used to format the entire tooltip body. The only arg is
			the associated data point. This formatter will over-ride yTooltipFormatter
			and yAxisTooltipDataFormatter. Signature:
			\`dataPoint => {}\`
		*/
		renderTooltipBody: func,
	};

	defaultTooltipFormatter = (dataPoint: { [key: string]: number }) => {
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
				{_.map(yFields, (field: string | number, fieldIndex) => (
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
							yFormatter(dataPoint[field], dataPoint),
							dataPoint[field]
						)}
					</Legend.Item>
				))}
			</Legend>
		);
	};

	handleMouseEnter = (hoveringSeriesIndex: number) => {
		this.setState({
			hoveringSeriesIndex,
		});
	};

	handleMouseOut = () => {
		this.setState({ hoveringSeriesIndex: null });
	};

	static defaultProps = {
		hasToolTips: true,
		xField: 'x',
		xFormatter: _.identity,
		yFields: ['y'],
		yFormatter: _.identity,
		yTooltipFormatter: (yField: string, yValueFormatted: any) =>
			`${yField}: ${yValueFormatted}`,
		renderTooltipBody: undefined,
		isStacked: false,
		colorOffset: 0,
		palette: chartConstants.PALETTE_7,
	};

	state = {
		hoveringSeriesIndex: null,
	};

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
			.domain(_.times(yFields.length, (num: number) => `${num}`))
			.range([0, xScale.bandwidth()])
			.round(true);

		// Copy the original so we can mutate it
		const yScale = yScaleOriginal.copy();

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various series' y data. One row per series.
		const transformedData = isStacked
			? memoizedStackByFields(data, yFields)
			: memoizedExtractFields(data, yFields, (yScale.domain() as number[])[0]);

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various group's y data
		if (isStacked) {
			yScale.domain([
				yScale.domain()[0] as any,
				//@ts-ignore
				yStackedMax || _.max(_.map(transformedData, (x) => _.last(_.last(x)))),
			]);
		}

		return (
			<g
				{..._.omit(passThroughs, nonPassThroughs)}
				className={cx(className, '&')}
			>
				{_.map(transformedData, (series, seriesIndex) => (
					<g key={seriesIndex}>
						{_.map(series, ([start, end], pointsIndex) => (
							<Bar
								key={pointsIndex}
								x={
									isStacked
										? // @ts-ignore
										  xScale(data[seriesIndex][xField])
										: // prettier-ignore
										  // @ts-ignore
										  innerXScale(pointsIndex) +
										// prettier-ignore
										// @ts-ignore
										xScale(data[seriesIndex][xField] as any)
								}
								y={yScale(end)}
								height={(yScale(start) as any) - (yScale(end) as any)}
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
									? // prettier-ignore
									  //@ts-ignore
									  yScale.range()[0] - yScale(_.last(series)[1])
									: // prettier-ignore
									  //@ts-ignore
									  yScale.range()[0] - yScale(_.max(_.flatten(series)))
							}
							width={xScale.bandwidth()}
							// @ts-ignore
							x={xScale(data[seriesIndex][xField])}
							y={yScale(_.max(_.flatten(series)) as any)}
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
	}
}

export interface IPureToolTipsProps extends StandardProps {
	isExpanded: boolean;

	height: number;

	width: number;

	x?: number;

	y?: number;

	series: Array<[number, number]>;

	seriesIndex: number;

	onMouseEnter: (seriesIndex: number) => void;
	//onMouseEnter: (event: MouseEvent<SVGRectElement, MouseEvent>) => void

	onMouseOut?:
		| ((event: React.MouseEvent<SVGRectElement, MouseEvent>) => void)
		| undefined;

	xFormatter: (d: Date, seriesIndex: number) => string;

	xField: string;

	renderBody: (dataPoint: number) => {};

	data: Array<{ [key: string]: string | number }>;
}

export class PureToolTip extends PureComponent<IPureToolTipsProps> {
	static displayName = 'PureToolTip';

	static _isPrivate = true;

	static propTypes = {
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
	};

	handleMouseEnter = () => {
		this.props.onMouseEnter(this.props.seriesIndex);
	};

	render(): React.ReactNode {
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
			<ToolTip isExpanded={isExpanded} flyOutMaxWidth='none' isLight={true}>
				<ToolTip.Target elementType='g'>
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

				<ToolTip.Title>
					{xFormatter(
						//@ts-ignore
						data[seriesIndex][xField],
						data[seriesIndex]
					)}
				</ToolTip.Title>

				<ToolTip.Body>{renderBody(data[seriesIndex] as any)}</ToolTip.Body>
			</ToolTip>
		);
	}
}

export default Bars;
