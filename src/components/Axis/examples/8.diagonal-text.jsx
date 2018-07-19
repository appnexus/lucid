import React from 'react';
import createClass from 'create-react-class';
import { Axis, d3Scale } from '../../../index';

const margin = { right: 20, left: 20, top: 10, bottom: 10 };
const horizontalAxisWidth = 500;
const horizontalAxisHeight = 100;
const verticalAxisWidth = 100;
const verticalAxisHeight = 200;
const innerWidth = horizontalAxisWidth - margin.right - margin.left;
const innerHeight = verticalAxisHeight - margin.top - margin.bottom;
const x = d3Scale
	.scaleLinear()
	.domain([0, 100000])
	.range([0, innerWidth]);
const y = d3Scale
	.scaleLinear()
	.domain([0, 100000])
	.range([innerHeight, 0]);

export default createClass({
	render() {
		return (
			<div>
				<div>
					<p>top</p>
					<svg width={horizontalAxisWidth} height={horizontalAxisHeight}>
						<g
							transform={`translate(${margin.left}, ${horizontalAxisHeight /
								2})`}
						>
							<Axis
								scale={x}
								orient="top"
								textOrientation="diagonal"
								tickCount={6}
							/>
						</g>
					</svg>
				</div>
				<div>
					<p>bottom</p>
					<svg width={horizontalAxisWidth} height={horizontalAxisHeight}>
						<g
							transform={`translate(${margin.left}, ${horizontalAxisHeight /
								2})`}
						>
							<Axis
								scale={x}
								orient="bottom"
								textOrientation="diagonal"
								tickCount={6}
							/>
						</g>
					</svg>
				</div>
				<div>
					<p>right</p>
					<svg width={verticalAxisWidth} height={verticalAxisHeight}>
						<g transform={`translate(0, ${margin.top})`}>
							<Axis
								scale={y}
								orient="right"
								textOrientation="diagonal"
								tickCount={6}
							/>
						</g>
					</svg>
				</div>
				<div>
					<p>left</p>
					<svg width={verticalAxisWidth} height={verticalAxisHeight}>
						<g transform={`translate(${verticalAxisWidth - 1}, ${margin.top})`}>
							<Axis
								scale={y}
								orient="left"
								textOrientation="diagonal"
								tickCount={6}
							/>
						</g>
					</svg>
				</div>
			</div>
		);
	},
});
