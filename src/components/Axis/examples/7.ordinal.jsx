import React from 'react';
import * as d3Scale from 'd3-scale';

import Axis from '../Axis';

const margin = {right: 20, left: 20};
const width = 400;
const height = 40;
const innerWidth = width - margin.right - margin.left;

const x = d3Scale.scaleBand()
	.domain(['a', 'b', 'c', 'd'])
	.range([0, innerWidth]);

export default React.createClass({
	render() {
		return (
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left}, 1)`}>
					<Axis
						orient='bottom'
						scale={x}
					/>
				</g>
			</svg>
		);
	},
});
