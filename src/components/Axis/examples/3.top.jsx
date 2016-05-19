import React from 'react';
import d3Scale from 'd3-scale';

import Axis from '../Axis';

const margin = {right: 20, left: 20};
const width = 400;
const height = 50;
const innerWidth = width - margin.right - margin.left;
const x = d3Scale.scaleLinear()
	.domain([0, 100000])
	.range([0, innerWidth]);

export default React.createClass({
	render() {
		return (
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left}, ${height / 2})`}>
					<Axis
						scale={x}
						orient='top'
						ticks={x.ticks(5)}
					/>
				</g>
			</svg>
		);
	},
});
