import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { groupByFields } from '../../util/chart-helpers';
import { createClass } from '../../util/component-types';
import d3Scale from 'd3-scale';
import d3Shape from 'd3-shape';

import Bar from '../Bar/Bar';

const cx = lucidClassNames.bind('&-Bars');

const {
	any,
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
 * Bars for your rectangular viewing pleasure.
 */
const Bars = createClass({
	displayName: 'Bars',

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
		 * Top position
		 */
		top: number,
		/**
		 * Left position
		 */
		left: number,
		/**
		 * De-normalized data
		 *
		 * ```
		 * [
		 *   { x: 'one', y0: 1, y1: 2, y2: 3, y3: 5 },
		 *   { x: 'two', y0: 2, y1: 3, y2: 4, y3: 6 },
		 *   { x: 'three', y0: 2, y1: 4, y2: 5, y3: 6 },
		 *   { x: 'four', y0: 3, y1: 6, y2: 7, y3: 7 },
		 *   { x: 'five', y0: 4, y1: 8, y2: 9, y3: 8 },
		 * ]
		 * ```
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
		 * color, this number will be added the bar index in determining which
		 * color the bars are.
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
		};
	},

	render() {
		const {
			className,
			data,
			left,
			top,
			xScale,
			xField,
			yScale: yScaleOriginal,
			yFields,
			isStacked,
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

		const yScaleHeight = _.max(yScale.range());

		return (
			<g
				{...passThroughs}
				className={cx(className, '&')}
				transform={`translate(${left}, ${top})`}
			>
				{_.map(transformedData, (d, dIndex) => {
					// TODO: this could probably be cleaned and DRY'd up. It's a bit odd
					// to have an if statement in the middle of the jsx.
					if (isStacked) {
						return (
							<g key={dIndex}>
								{_.map(d, (series, seriesIndex) => (
									<Bar
										key={seriesIndex}
										x={xScale(data[seriesIndex][xField])}
										y={yScale(series[1])}
										height={yScale(series[0]) - yScale(series[1])}
										width={xScale.bandwidth()}
										color={dIndex}
									/>
								))}
							</g>
						);
					} else {
						const innerXScale = d3Scale.scaleBand()
							.domain(_.times(yFields.length))
							.range([0, xScale.bandwidth()])
							.round(true);

						return (
							<g key={dIndex}>
								{_.map(d, (y, yIndex) => (
									<Bar
										key={yIndex}
										x={innerXScale(dIndex) + xScale(data[yIndex][xField])}
										y={yScale(y)}
										height={yScaleHeight - yScale(y)}
										width={innerXScale.bandwidth()}
										color={dIndex}
									/>
								))}
							</g>
						);
					}
				})}
			</g>
		);
	}
});

export default Bars;
