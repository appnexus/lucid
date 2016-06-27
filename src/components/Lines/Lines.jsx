import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import { groupByFields } from '../../util/chart-helpers';
import * as d3Shape from 'd3-shape';
import * as chartConstants from '../../constants/charts';

import Line from '../Line/Line';

const cx = lucidClassNames.bind('&-Lines');

const {
	arrayOf,
	func,
	number,
	object,
	bool,
	string,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * Such lines. Much wow.
 */
const Lines = createClass({
	displayName: 'Lines',

	_lucidIsPrivate: true,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Top
		 */
		top: number,
		/**
		 * Left
		 */
		left: number,
		/**
		 * Takes one of the palettes exported from `lucid.chartConstants`.
		 * Available palettes:
		 *
		 * - `PALETTE_6` (default)
		 * - `PALETTE_30`
		 * - `PALETTE_MONOCHROME_0_5`
		 * - `PALETTE_MONOCHROME_1_5`
		 * - `PALETTE_MONOCHROME_2_5`
		 * - `PALETTE_MONOCHROME_3_5`
		 * - `PALETTE_MONOCHROME_4_5`
		 * - `PALETTE_MONOCHROME_5_5`
		 *
		 */
		palette: arrayOf(string),
		/**
		 * You can pass in an object if you want to map fields to
		 * `lucid.chartConstants` or custom colors:
		 *
		 *     {
		 *       'imps': COLOR_0,
		 *       'rev': COLOR_3,
		 *       'clicks': '#abc123',
		 *     }
		 */
		colorMap: object,
		/**
		 * De-normalized data, e.g.
		 *
		 *
		 *     [
		 *       { x: 'one'   , y: 1 },
		 *       { x: 'two'   , y: 2 },
		 *       { x: 'three' , y: 2 },
		 *       { x: 'four'  , y: 3 },
		 *       { x: 'five'  , y: 4 },
		 *     ]
		 *
		 *
		 * Or (be sure to set `yFields` to `['y0', 'y1', 'y2', 'y3']`)
		 *
		 *     [
		 *       { x: 'one'   , y0: 1  , y1: 2 , y2: 3 , y3: 5 },
		 *       { x: 'two'   , y0: 2  , y1: 3 , y2: 4 , y3: 6 },
		 *       { x: 'three' , y0: 2  , y1: 4 , y2: 5 , y3: 6 },
		 *       { x: 'four'  , y0: 3  , y1: 6 , y2: 7 , y3: 7 },
		 *       { x: 'five'  , y0: 4  , y1: 8 , y2: 9 , y3: 8 },
		 *       { x: 'six'   , y0: 20 , y1: 8 , y2: 9 , y3: 1 },
		 *     ]
		 *
		 */
		data: arrayOf(object).isRequired,
		/**
		 * The scale for the x axis. This must be a d3-scale scale.
		 */
		xScale: func.isRequired,
		/**
		 * The scale for the y axis. This must be a d3-scale scale.
		 */
		yScale: func.isRequired,
		/**
		 * The field we should look up your x data by.
		 */
		xField: string,
		/**
		 * The field(s) we should look up your y data by. Each entry represents a
		 * series. Your actual y data should be numeric.
		 */
		yFields: arrayOf(string),
		/**
		 * This will stack the data instead of grouping it. In order to stack the
		 * data we have to calculate a new domain for the y scale that is based on
		 * the `sum` of the data.
		 */
		isStacked: bool,
		/**
		 * Sometimes you might not want the colors to start rotating at the blue
		 * color, this number will be added the line index in determining which
		 * color the lines are.
		 */
		colorOffset: number,
	},

	getDefaultProps() {
		return {
			top: 0,
			left: 0,
			xField: 'x',
			yFields: ['y'],
			isStacked: false,
			colorOffset: 0,
			palette: chartConstants.PALETTE_6,
		};
	},

	render() {
		const {
			className,
			data,
			isStacked,
			palette,
			colorMap,
			left,
			top,
			colorOffset,
			xScale,
			xField,
			yFields,
			yScale: yScaleOriginal,
			...passThroughs,
		} = this.props;

		// Copy the original so we can mutate it
		const yScale = yScaleOriginal.copy();

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various series' y data. One row per series.
		const transformedData = isStacked
			? d3Shape.stack().keys(yFields)(data)
			: groupByFields(data, yFields);

		const area = isStacked
			? d3Shape.area()
				.defined((a) => _.isFinite(a[0]) && _.isFinite(a[1]))
				.x((a, i) => xScale(data[i][xField]))
				.y0((a) => yScale(a[1]))
				.y1((a) => yScale(a[0]))
			: d3Shape.area()
				.defined(_.isFinite)
				.x((a, i) => xScale(data[i][xField]))
				.y((a) => yScale(a));

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various group's y data
		if (isStacked) {
			yScale.domain([
				yScale.domain()[0], // only stacks well if this is `0`
				_.chain(transformedData).last().flatten().max().value(),
			]);
		}

		return (
			<g
				{...passThroughs}
				className={cx(className, '&')}
				transform={`translate(${left}, ${top})`}
			>
				{_.map(transformedData, (d, dIndex) => (
					<g key={dIndex}>
						<Line
							color={_.get(colorMap, yFields[dIndex], palette[(dIndex % palette.length) + colorOffset])}
							d={area(d)}
						/>
					</g>
				))}
			</g>
		);
	},
});

export default Lines;
