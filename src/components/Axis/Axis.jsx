import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { discreteTicks } from '../../util/chart-helpers';

const boundClassNames = lucidClassNames.bind('&-Axis');

// For horizontal axes we choose to anchor the text to the 'end', this small
// offset helps the letters appear nicely with the tick. This number would
// need to change if the tick font-size changed.
const TEXT_OFFSET = 3;

const {
	func,
	number,
	oneOf,
	array,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * Fashion axe mixtape vegan shoreditch put a bird on it selvage banh mi franzen
 */
const BarChart = React.createClass({
	propTypes: {
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
		 * Usually when using an ordinal scale you should show a tick mark for
		 * every value, but there are some rare cases when you want to only show a
		 * sampling of the ticks. By passing in a number to we'll generate an
		 * evenly spaced number of ticks and display them for ordinal scales.
		 */
		ordinalTickCount: number,
	},

	getDefaultProps() {
		return {
			innerTickSize: 6, // same as d3
			outerTickSize: 6, // same as d3
			tickPadding: 3, // same as d3
			tickFormat: undefined, // purposefully `undefined` so we can drop through to destructuring defaults
			orient: 'bottom',
			ordinalTickCount: null,
		};
	},

	render() {
		const {
			scale,
			orient,
			ordinalTickCount,
			ticks = scale.ticks ? scale.ticks() : discreteTicks(scale.domain(), ordinalTickCount), // ordinal scales don't have `ticks` but they do have `domains`
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
				className={boundClassNames('&')}
				{...passThroughs}
			>
			{isH ? (
				<path
					className={boundClassNames('&-domain')}
					d={`M${range[0]},${sign * outerTickSize}V0H${range[1]}V${sign * outerTickSize}`}
				/>
			) : (
				<path
					className={boundClassNames('&-domain')}
					d={`M${sign * outerTickSize},${range[0]}H0V${range[1]}H${sign * outerTickSize}`}
				/>
			)}
				{_.map(ticks, (tick) =>
					<g
						key={tick}
						transform={`translate(${isH ? scaleNormalized(tick) : 0}, ${isH ? 0 : scaleNormalized(tick)})`}
					>
						<line
							className={boundClassNames('&-tick')}
							x2={isH ? 0 : sign * innerTickSize}
							y2={isH ? sign * innerTickSize : 0}
						/>
						<text
							className={boundClassNames('&-tick-text')}
							x={isH ? TEXT_OFFSET : sign * tickSpacing}
							y={isH ? sign * tickSpacing : 0}
							dy={isH
								? sign < 0 ? '0em' : '.71em' // magic d3 number
								: '.32em' // magic d3 number
							}
							style={{
								textAnchor: isH
									? 'end' // differ from d3 here, works in conjunction with TEXT_OFFSET
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

export default BarChart;
