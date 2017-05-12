import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { discreteTicks } from '../../util/chart-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Axis');

const { string, array, func, number, oneOf } = PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * *For use within an `svg`*
 *
 * Axes are used to help render human-readable reference marks on charts. They
 * can either be horizontal or vertical and really only need a scale to be able
 * to draw properly.
 *
 * This component is a very close sister to d3's svg axis and most of the logic
 * was ported from there.
 */
const Axis = createClass({
	displayName: 'Axis',

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Must be a d3 scale. Lucid exposes the `lucid.d3Scale` library for use
		 * here.
		 */
		scale: func.isRequired,
		/**
		 * Size of the ticks for each discrete tick mark.
		 */
		innerTickSize: number,
		/**
		 * Size of the tick marks found at the beginning and end of the axis. It's
		 * common to set this to `0` to remove them.
		 */
		outerTickSize: number,
		/**
		 * An optional function that can format ticks. Generally this shouldn't be
		 * needed since d3 has very good default formatters for most data.
		 *
		 * Signature: `(tick) => {}`
		 */
		tickFormat: func,
		/**
		 * If you need fine grained control over the axis ticks, you can pass them
		 * in this array.
		 */
		ticks: array,
		/**
		 * Determines the spacing between each tick and its text.
		 */
		tickPadding: number,
		/**
		 * Determines the orientation of the ticks. `left` and `right` will
		 * generate a vertical axis, whereas `top` and `bottom` will generate a
		 * horizontal axis.
		 */
		orient: oneOf(['top', 'bottom', 'left', 'right']),
		/**
		 * Control the number of ticks displayed.
		 *
		 * If the scale is time based or linear, this number acts a "hint" per the
		 * default behavior of D3. If it's an ordinal scale, this number is treated
		 * as an absolute number of ticks to display and is powered by our own
		 * utility function `discreteTicks`.
		 */
		tickCount: number,
	},

	getDefaultProps() {
		return {
			innerTickSize: 6, // same as d3
			outerTickSize: 6, // same as d3
			tickPadding: 3, // same as d3
			orient: 'bottom',
			tickCount: null,
		};
	},

	render() {
		const {
			scale,
			className,
			orient,
			tickCount,
			ticks = scale.ticks
				? scale.ticks(tickCount)
				: discreteTicks(scale.domain(), tickCount), // ordinal scales don't have `ticks` but they do have `domains`
			innerTickSize,
			outerTickSize,
			tickFormat = scale.tickFormat ? scale.tickFormat() : _.identity,
			tickPadding,
			...passThroughs
		} = this.props;

		const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

		// Domain
		const range = scale.range();
		const sign = orient === 'top' || orient === 'left' ? -1 : 1;
		const isH = orient === 'top' || orient === 'bottom'; // is horizontal

		let scaleNormalized = scale;

		// Only band scales have `bandwidth`, this conditional helps center the
		// ticks on the bands
		if (scale.bandwidth) {
			const bandModifier = scale.bandwidth() / 2;
			scaleNormalized = d => scale(d) + bandModifier;
		}

		return (
			<g {...omitProps(passThroughs, Axis)} className={cx(className, '&')}>
				{isH
					? <path
							className={cx('&-domain')}
							d={`M${range[0]},${sign * outerTickSize}V0H${range[1]}V${sign * outerTickSize}`}
						/>
					: <path
							className={cx('&-domain')}
							d={`M${sign * outerTickSize},${range[0]}H0V${range[1]}H${sign * outerTickSize}`}
						/>}
				{_.map(ticks, tick => (
					<g
						key={tick}
						transform={`translate(${isH ? scaleNormalized(tick) : 0}, ${isH ? 0 : scaleNormalized(tick)})`}
					>
						<line
							className={cx('&-tick')}
							x2={isH ? 0 : sign * innerTickSize}
							y2={isH ? sign * innerTickSize : 0}
						/>
						<text
							className={cx('&-tick-text')}
							x={isH ? 0 : sign * tickSpacing}
							y={isH ? sign * tickSpacing : 0}
							dy={
								isH
									? sign < 0 ? '0em' : '.71em' // magic d3 number
									: '.32em' // magic d3 number
							}
							style={{
								textAnchor: isH ? 'middle' : sign < 0 ? 'end' : 'start',
							}}
						>
							{tickFormat(tick)}
						</text>
					</g>
				))}
			</g>
		);
	},
});

export default Axis;
