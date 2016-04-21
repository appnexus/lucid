import _ from 'lodash';
// import d3 from 'd3-scale';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Axis');

const {
	func,
	number,
	oneOf,
	array,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "charts"]}
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
		 * An optional function that gets passed to `scale.tickFormat`. Generally
		 * this shouldn't be needed since d3 has very good default formatters for
		 * most data.
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
	},

	getDefaultProps() {
		return {
			innerTickSize: 6, // same as d3
			outerTickSize: 6, // same as d3
			tickPadding: 3, // same as d3
			tickFormat: null,
			orient: 'bottom',
		};
	},

	render() {
		const {
			scale,
			orient,
			ticks = scale.ticks(),
			innerTickSize,
			outerTickSize,
			tickFormat,
			tickPadding,
			...passThroughs,
		} = this.props;

		const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

		// Domain
		const range = scale.range();
		const sign = orient === 'top' || orient === 'left' ? -1 : 1;
		const isH = orient === 'top' || orient === 'bottom';

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
						transform={`translate(${isH ? scale(tick) : 0}, ${isH ? 0 : scale(tick)})`}
					>
						<line
							className={boundClassNames('&-tick')}
							x2={isH ? 0 : sign * innerTickSize}
							y2={isH ? sign * innerTickSize : 0}
						/>
						<text
							className={boundClassNames('&-tick-text')}
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
							{scale.tickFormat ?
								scale.tickFormat(tickFormat)(tick)
							:
								tick
							}
						</text>
					</g>
				)}
			</g>
		);
	}
});

export default BarChart;
