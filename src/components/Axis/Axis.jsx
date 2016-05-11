import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { discreteTicks } from '../../util/chart-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Axis');

const {
	array,
	func,
	number,
	oneOf,
	any,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * Axes and allies
 *
 * This component is a very close sister to `d3.avg.axis` and most of the logic
 * was ported from d3.
 */
const Axis = createClass({
	displayName: 'Axis',

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
		 * Must be a D3 scale.
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
		 * Usually when using an ordinal scale you should show a tick mark for
		 * every value, but there are some rare cases when you want to only show a
		 * sampling of the ticks. By passing in a number to we'll generate an
		 * evenly spaced number of ticks and display them for ordinal and
		 * continuous scales.
		 */
		tickCount: number,
	},

	getDefaultProps() {
		return {
			innerTickSize: 6, // same as d3
			outerTickSize: 6, // same as d3
			tickPadding: 3, // same as d3
			tickFormat: undefined, // purposefully `undefined` so we can drop through to destructuring defaults
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
			...passThroughs,
		} = this.props;

		const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

		// Domain
		const range = scale.range();
		const sign = orient === 'top' || orient === 'left' ? -1 : 1;
		const isH = orient === 'top' || orient === 'bottom';

		let scaleNormalized = scale;

		// Only ordinal scales have `bandwidth`
		if (scale.bandwidth) {
			const bandModifier = scale.bandwidth() / 2;
			scaleNormalized = (d) => scale(d) + bandModifier;
		}

		return (
			<g
				{...passThroughs}
				className={cx(className, '&')}
			>
			{isH ? (
				<path
					className={cx('&-domain')}
					d={`M${range[0]},${sign * outerTickSize}V0H${range[1]}V${sign * outerTickSize}`}
				/>
			) : (
				<path
					className={cx('&-domain')}
					d={`M${sign * outerTickSize},${range[0]}H0V${range[1]}H${sign * outerTickSize}`}
				/>
			)}
				{_.map(ticks, (tick) =>
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
							dy={isH
								? sign < 0 ? '0em' : '.71em' // magic d3 number
								: '.32em' // magic d3 number
							}
							style={{
								textAnchor: isH
									? 'middle'
									: sign < 0 ? 'end' : 'start'
							}}
						>
							{tickFormat(tick)}
						</text>
					</g>
				)}
			</g>
		);
	}
});

export default Axis;
