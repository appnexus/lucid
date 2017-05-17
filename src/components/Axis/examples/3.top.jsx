import React from 'react';
import createClass from 'create-react-class';
import { Axis, d3Scale } from '../../../index';

const margin = { right: 20, left: 20 };
const width = 400;
const height = 50;
const innerWidth = width - margin.right - margin.left;
const x = d3Scale.scaleLinear().domain([0, 100000]).range([0, innerWidth]);

export default createClass({
	render() {
		return (
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left}, ${height / 2})`}>
					<Axis scale={x} orient="top" tickCount={6} />
				</g>
			</svg>
		);
	},
});
