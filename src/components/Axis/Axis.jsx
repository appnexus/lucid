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
		 * Size will refer to either `width` or `height` depending on the value of
		 * `kind`
		 */
		size: number,
		orient: oneOf(['left', 'right']),
		innerTickSize: number,
		outerTickSize: number,
		tickFormat: func,
		ticks: array,
		orient: oneOf(['top', 'bottom', 'left', 'right']),
	},

	getDefaultProps() {
		return {
			size: 200,
			innerTickSize: 6, // same as d3
			outerTickSize: 6, // same as d3
			tickFormat: null,
			kind: 'bottom',
		};
	},

	render() {
		const {
			size,
			scale,
			orient,
			ticks = scale.ticks(),
			innerTickSize,
			outerTickSize,
			tickFormat,
			...passThroughs,
		} = this.props;

		// Domain
		const range = scale.range();
		const sign = orient === 'top' || orient === 'left' ? -1 : 1;

		return (
			<g
				className={boundClassNames('&')}
				{...passThroughs}
			>
				<path d={`M${range[0]},${sign * outerTickSize}V0H${range[1]}V${sign * outerTickSize}`} />
				{_.map(ticks, (tick, index) =>
					<g
						key={index}
						className={boundClassNames('&-tick')}
						transform={`translate(${scale(tick)}, 0)`}
					>
						<line
							x2={0}
							y2={innerTickSize}
						/>
						<text
							x={0}
							y={innerTickSize + 3}
							dy='.71em'
						>
							{scale.tickFormat(tickFormat)(tick)}
						</text>
					</g>
				)}
			</g>
		);
	}
});

export default BarChart;
