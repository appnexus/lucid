import React from 'react';
import {
	Axis,
	d3Scale,
} from '../../../index';

const margin = {top: 10, bottom: 10};
const width = 50;
const height = 200;
const innerHeight = height - margin.top - margin.bottom;
const y = d3Scale.scaleLinear()
	.domain([0, 100000])
	.range([innerHeight, 0]);

export default React.createClass({
	render() {
		return (
			<svg width={width} height={height}>
				<g transform={`translate(${width - 1}, ${margin.top})`}>
					<Axis scale={y} orient='left' />
				</g>
			</svg>
		);
	},
});
