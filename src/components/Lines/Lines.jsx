import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import { groupByFields } from '../../util/chart-helpers';
import * as d3Shape from 'd3-shape';
import * as chartConstants from '../../constants/charts';

import Line from '../Line/Line';

const cx = lucidClassNames.bind('&-Lines');

const { arrayOf, func, number, object, bool, string } = PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"], "madeFrom": ["Line"]}
 *
 * *For use within an `svg`*
 *
 * Lines are typically used to represent continuous data and can be stacked.
 */
const Lines = createClass({
	displayName: 'Lines',

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
		 * The scale for the x axis. Must be a d3 scale. Lucid exposes the
		 * `lucid.d3Scale` library for use here.
		 */
		xScale: func.isRequired,
		/**
		 * The scale for the y axis. Must be a d3 scale. Lucid exposes the
		 * `lucid.d3Scale` library for use here.
		 */
		yScale: func.isRequired,
		/**
		 * Typically this number can be derived from the yScale. However when we're
		 * `isStacked` we need to calculate a new domain for the yScale based on
		 * the sum of the data. If you need explicit control of the y max when
		 * stacking, pass it in here.
		 */
		yStackedMax: number,
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
			colorOffset,
			xScale,
			xField,
			yFields,
			yScale: yScaleOriginal,
			yStackedMax,
			...passThroughs
		} = this.props;

		// Copy the original so we can mutate it
		const yScale = yScaleOriginal.copy();

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various series' y data. One row per series.
		const transformedData = isStacked
			? d3Shape.stack().keys(yFields)(data)
			: groupByFields(data, yFields);

		const area = isStacked
			? d3Shape
					.area()
					.defined(a => _.isFinite(a[0]) && _.isFinite(a[1]))
					.x((a, i) => xScale(data[i][xField]))
					.y0(a => yScale(a[1]))
					.y1(a => yScale(a[0]))
			: d3Shape
					.area()
					.defined(a => _.isFinite(a) || _.isDate(a))
					.x((a, i) => xScale(data[i][xField]))
					.y(a => yScale(a));

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various group's y data
		if (isStacked) {
			yScale.domain([
				yScale.domain()[0], // only stacks well if this is `0`
				yStackedMax || _.max(_.flatten(_.last(transformedData))),
			]);
		}

		return (
			<g {...omitProps(passThroughs, Lines)} className={cx(className, '&')}>
				{_.map(transformedData, (d, dIndex) => (
					<g key={dIndex}>
						<Line
							color={_.get(
								colorMap,
								yFields[dIndex],
								palette[(dIndex + colorOffset) % palette.length]
							)}
							d={area(d)}
						/>
					</g>
				))}
			</g>
		);
	},
});

export default Lines;
