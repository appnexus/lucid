import React from 'react';
import createClass from 'create-react-class';
import { Axis, d3Scale, d3Time } from '../../../index';

const margin = { right: 10, left: 30 };
const width = 400;
const height = 200;
const innerWidth = width - margin.right - margin.left;

const x = d3Scale
	.scaleTime()
	.domain([new Date('2015-01-01'), new Date('2017-02-01')])
	.range([0, innerWidth]);

export default createClass({
	render() {
		return (
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left}, 1)`}>
					<Axis orient="bottom" scale={x} />
				</g>

				<g transform={`translate(${margin.left}, ${height / 3 * 1})`}>
					<Axis
						orient="bottom"
						scale={x}
						ticks={x.ticks(d3Time.timeMonth, 6)}
					/>
				</g>

				<g transform={`translate(${margin.left}, ${height / 3 * 2})`}>
					<Axis orient="bottom" scale={x} ticks={x.ticks(d3Time.timeYear, 1)} />
				</g>
			</svg>
		);
	},
});
