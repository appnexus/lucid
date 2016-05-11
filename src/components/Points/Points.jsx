import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import { groupByFields } from '../../util/chart-helpers';
import d3Shape from 'd3-shape';

import Point from '../Point/Point';

const cx = lucidClassNames.bind('&-Points');

const {
	any,
	arrayOf,
	func,
	number,
	object,
	bool,
	string,
} = React.PropTypes;

function isValidSeries(series) {
	if (_.isArray(series)) {
		return _.isFinite(_.last(series));
	}

	return _.isFinite(series);
}

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * Put some points on that data.
 */
const Points = createClass({
	displayName: 'Points',

	statics: {
		_lucidIsPrivate: true,
	},

	propTypes: {
		/**
		 * Classes are appended to root element along with existing classes using
		 * the `classnames` library.
		 */
		className: any,
		/**
		 * Top
		 */
		top: number,
		/**
		 * Left
		 */
		left: number,
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
		 * Sometimes you might not want the colors to start rotating at the blue
		 * color, this number will be added the line index in determining which
		 * color the lines are.
		 */
		colorOffset: number,
		/**
		 * Display a stroke around each of the points.
		 */
		hasStroke: bool,
		/**
		 * This will stack the data. In order to stack the data we have to
		 * calculate a new domain for the y scale that is based on the `sum` of the
		 * data.
		 */
		isStacked: bool,
	},

	getDefaultProps() {
		return {
			top: 0,
			left: 0,
			xField: 'x',
			yFields: ['y'],
			colorOffset: 0,
			hasStroke: true,
			isStacked: false,
		};
	},

	render() {
		const {
			className,
			data,
			left,
			top,
			colorOffset,
			xField,
			hasStroke,
			xScale,
			yFields,
			isStacked,
			yScale: yScaleOriginal,
			...passThroughs,
		} = this.props;

		// Copy the original so we can mutate it
		let yScale = yScaleOriginal.copy();

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various series' y data. One row per series.
		const transformedData = isStacked
			? d3Shape.stack().keys(yFields)(data)
			: groupByFields(data, yFields);

		// If we are stacked, we need to calculate a new domain based on the sum of
		// the various group's y data
		if (isStacked) {
			yScale.domain([
				yScale.domain()[0],
				_.chain(transformedData).last().flatten().max().value()
			]);
		}

		return (
			<g
				{...passThroughs}
				className={cx(className, '&')}
				transform={`translate(${left}, ${top})`}
			>
				{_.map(transformedData, (d, dIndex) => (
					_.map(d, (series, seriesIndex) => (
						isValidSeries(series) ?
							<Point
								x={xScale(data[seriesIndex][xField])}
								y={yScale(_.isArray(series) ? _.last(series) : series)}
								hasStroke={hasStroke}
								kind={dIndex + colorOffset}
								color={dIndex + colorOffset}
							/>
						: null
					))
				))}
			</g>
		);
	}
});

export default Points;
