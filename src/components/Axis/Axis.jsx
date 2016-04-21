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
		innerTickSize: number,
		outerTickSize: number,
		tickFormat: func,
		ticks: array,
		orient: oneOf(['bottom', 'left']), // TODO test and support top and right
	},

	getDefaultProps() {
		return {
			size: 200,
			innerTickSize: 6, // same as d3
			outerTickSize: 6, // same as d3
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
			...passThroughs,
		} = this.props;

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
				<path d={`M${range[0]},${sign * outerTickSize}V0H${range[1]}V${sign * outerTickSize}`} />
			) : (
				<path d={`M${sign * outerTickSize},${range[0]}H0V${range[1]}H${sign * outerTickSize}`} />
			)}
				{_.map(ticks, (tick, index) =>
					<g
						key={index}
						transform={`translate(${isH ? scale(tick) : 0}, ${isH ? 0 : range[1] - scale(tick)})`}
					>
						<line
							x2={isH ? 0 : sign * innerTickSize}
							y2={isH ? innerTickSize : 0}
						/>
						<text
							x={isH ? 0 : innerTickSize * 2 * sign}
							y={isH ? innerTickSize + 3 : 0}
							dy={isH
								? sign < 0 ? '0em' : '.71em'
								: '.32em'
							}
							style={{
								textAnchor: isH
									? 'middle'
									: sign < 0 ? 'end' : 'start'
							}}
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
