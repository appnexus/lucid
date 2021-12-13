import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import { groupByFields } from '../../util/chart-helpers';
import * as chartConstants from '../../constants/charts';
import Line from '../Line/Line';

const cx = lucidClassNames.bind('&-Lines');

const { arrayOf, func, number, object, bool, string } = PropTypes;

const isUniform = (array: any[]): boolean =>
	_.every(array, (val): boolean => val === _.first(array));

export interface ILinesProps
	extends StandardProps,
		React.SVGProps<SVGGElement> {
	/** Top */
	top?: number;

	/** Left */
	left?: number;

	/** 	Takes one of the palettes exported from \`lucid.chartConstants\`.
	Available palettes:

	- \`PALETTE_7\` (default)
	- \`PALETTE_30\`
	- \`PALETTE_MONOCHROME_0_5\`
	- \`PALETTE_MONOCHROME_1_5\`
	- \`PALETTE_MONOCHROME_2_5\`
	- \`PALETTE_MONOCHROME_3_5\`
	- \`PALETTE_MONOCHROME_4_5\`
	- \`PALETTE_MONOCHROME_5_5\`
	- \`PALETTE_MONOCHROME_6_5\` */
	palette: string[];

	/** You can pass in an object if you want to map fields to
	\`lucid.chartConstants\` or custom colors:

		{
			'imps': COLOR_0,
			'rev': COLOR_3,
			'clicks': '#abc123',
		} */
	colorMap?: object;

	/** De-normalized data, e.g.

		[
			{ x: 'one'   , y: 1 },
			{ x: 'two'   , y: 2 },
			{ x: 'three' , y: 2 },
			{ x: 'four'  , y: 3 },
			{ x: 'five'  , y: 4 },
		]

	Or (be sure to set \`yFields\` to \`['y0', 'y1', 'y2', 'y3']\`)

		[
			{ x: 'one'   , y0: 1  , y1: 2 , y2: 3 , y3: 5 },
			{ x: 'two'   , y0: 2  , y1: 3 , y2: 4 , y3: 6 },
			{ x: 'three' , y0: 2  , y1: 4 , y2: 5 , y3: 6 },
			{ x: 'four'  , y0: 3  , y1: 6 , y2: 7 , y3: 7 },
			{ x: 'five'  , y0: 4  , y1: 8 , y2: 9 , y3: 8 },
			{ x: 'six'   , y0: 20 , y1: 8 , y2: 9 , y3: 1 },
		] */

	data: Array<{ [key: string]: any }>;

	//TODO: xScale can support several different types of scales, maybe all types; we need to enumerate what it acccepts and encode it into the type
	// Having a number | string union type gets converted by TypeScript to ReactText; It may be related to the LibraryManagedAttributes
	/** The scale for the x axis. Must be a d3 scale. Lucid exposes the
		`lucid.d3Scale` library for use here. */
	xScale:
		| d3Scale.ScaleBand<string>
		| d3Scale.ScalePoint<string>
		| d3Scale.ScaleTime<number, number>;

	/** The scale for the y axis. Must be a d3 scale. Lucid exposes the
		`lucid.d3Scale` library for use here. */
	yScale:
		| d3Scale.ScaleContinuousNumeric<number, number>
		| d3Scale.ScaleBand<number>
		| d3Scale.ScalePoint<number>
		| d3Scale.ScaleLinear<number, number>;

	/** Typically this number can be derived from the yScale. However when we're
		\`isStacked\` we need to calculate a new domain for the yScale based on
		the sum of the data. If you need explicit control of the y max when
		stacking, pass it in here. */
	yStackedMax?: number | object;

	/** The field we should look up your x data by. */
	xField: string;

	/** The field(s) we should look up your y data by. Each entry represents a
		series. Your actual y data should be numeric. */
	yFields: string[];

	/** This will stack the data instead of grouping it. In order to stack the
		data we have to calculate a new domain for the y scale that is based on
		the \`sum\` of the data. */
	isStacked: boolean;

	/** Sometimes you might not want the colors to start rotating at the blue
		color, this number will be added the line index in determining which
		color the lines are. */
	colorOffset: number;
}

const defaultProps = {
	xField: 'x',
	yFields: ['y'],
	isStacked: false,
	colorOffset: 0,
	palette: chartConstants.PALETTE_7,
};

export const Lines = (props: ILinesProps): React.ReactElement => {
	const {
		className,
		data,
		isStacked,
		palette,
		colorMap,
		colorOffset,
		xScale,
		xField,
		yFields,
		yScale: yScaleOriginal,
		yStackedMax,
		...passThroughs
	} = props;

	// Copy the original so we can mutate it
	const yScale = yScaleOriginal.copy();

	// If we are stacked, we need to calculate a new domain based on the sum of
	// the various series' y data. One row per series.
	const transformedData = isStacked
		? d3Shape.stack().keys(yFields)(data as Array<{ [key: string]: number }>)
		: groupByFields(data, yFields);

	const stackedArea = d3Shape
		.area<[number, number]>()
		.defined((a): boolean => _.isFinite(a[0]) && _.isFinite(a[1]))
		.x((a, i): number => xScale(data[i][xField]) as number)
		.y0((a): number => yScale(a[1]) as number)
		.y1((a): number => yScale(a[0]) as number);

	const area = d3Shape
		.area<number>()
		.defined((a): boolean => _.isFinite(a) || _.isDate(a))
		.x((a, i): number => xScale(data[i][xField]) as number)
		.y((a, i): number => yScale(a) as number);

	// If we are stacked, we need to calculate a new domain based on the sum of
	// the various group's y data
	if (isStacked) {
		yScale.domain([
			yScale.domain()[0], // only stacks well if this is `0`
			yStackedMax || _.max(_.flatten(_.last(transformedData))),
		]);
	}

	return (
		<g {...passThroughs} className={cx(className, '&')}>
			{_.map(
				transformedData,
				(d, dIndex): React.ReactElement => (
					<g key={dIndex}>
						<Line
							color={_.get(
								colorMap,
								yFields[dIndex],
								palette[(dIndex + colorOffset) % palette.length]
							)}
							d={(isStacked ? stackedArea(d) : area(d)) as string}
							// Fixes a bug in chrome by forcing a reflow of the element (ANXR-1405)
							style={isUniform(d) ? { transform: 'scaleX(0.999)' } : undefined}
						/>
					</g>
				)
			)}
		</g>
	);
};

Lines.defaultProps = defaultProps;
Lines.displayName = 'Lines';
Lines.peek = {
	description: `*For use within an \`svg\`*. A \`Line\` is typically used to represent continuous data and can be stacked.`,
	categories: ['visualizations', 'chart primitives'],
	madeFrom: ['Line'],
};
Lines.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Top
	*/
	top: number,

	/**
		Left
	*/
	left: number,

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
		De-normalized data, e.g.

			[
				{ x: 'one'   , y: 1 },
				{ x: 'two'   , y: 2 },
				{ x: 'three' , y: 2 },
				{ x: 'four'  , y: 3 },
				{ x: 'five'  , y: 4 },
			]


		Or (be sure to set \`yFields\` to \`['y0', 'y1', 'y2', 'y3']\`)

			[
				{ x: 'one'   , y0: 1  , y1: 2 , y2: 3 , y3: 5 },
				{ x: 'two'   , y0: 2  , y1: 3 , y2: 4 , y3: 6 },
				{ x: 'three' , y0: 2  , y1: 4 , y2: 5 , y3: 6 },
				{ x: 'four'  , y0: 3  , y1: 6 , y2: 7 , y3: 7 },
				{ x: 'five'  , y0: 4  , y1: 8 , y2: 9 , y3: 8 },
				{ x: 'six'   , y0: 20 , y1: 8 , y2: 9 , y3: 1 },
			]
	*/
	data: arrayOf(object).isRequired,

	/**
		The scale for the x axis. Must be a d3 scale. Lucid exposes the
		\`lucid.d3Scale\` library for use here.
	*/
	xScale: func.isRequired,

	/**
		The scale for the y axis. Must be a d3 scale. Lucid exposes the
		\`lucid.d3Scale\` library for use here.
	*/
	yScale: func.isRequired,

	/**
		Typically this number can be derived from the yScale. However when we're
		\`isStacked\` we need to calculate a new domain for the yScale based on
		the sum of the data. If you need explicit control of the y max when
		stacking, pass it in here.
	*/
	yStackedMax: number,

	/**
		The field we should look up your x data by.
	*/
	xField: string,

	/**
		The field(s) we should look up your y data by. Each entry represents a
		series. Your actual y data should be numeric.
	*/
	yFields: arrayOf(string),

	/**
		This will stack the data instead of grouping it. In order to stack the
		data we have to calculate a new domain for the y scale that is based on
		the \`sum\` of the data.
	*/
	isStacked: bool,

	/**
		Sometimes you might not want the colors to start rotating at the blue
		color, this number will be added the line index in determining which
		color the lines are.
	*/
	colorOffset: number,
};

export default Lines;
