import React from 'react';
import createClass from 'create-react-class';
import { Axis, d3Scale } from '../../../index';

const margin = { top: 10, bottom: 10 };
const width = 50;
const height = 200;
const innerHeight = height - margin.top - margin.bottom;
const y = d3Scale.scaleLinear().domain([0, 100000]).range([innerHeight, 0]);

export default createClass({
	render() {
		return (
			<svg width={width} height={height}>
				<g transform={`translate(0, ${margin.top})`}>
					<Axis scale={y} orient="right" />
				</g>
			</svg>
		);
	},
});
