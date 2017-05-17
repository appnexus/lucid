import React from 'react';
import createClass from 'create-react-class';
import { AxisLabel, chartConstants } from '../../../index';

const width = 1000;
const height = 400;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

export default createClass({
	render() {
		return (
			<svg width={width} height={height}>
				{/* dotted outline for the svg */}
				<rect
					x={1}
					y={1}
					width={width - 2}
					height={height - 2}
					style={{
						strokeWidth: 1,
						strokeDasharray: '2,2',
						fill: 'none',
						stroke: 'black',
					}}
				/>

				{/* show the inner part of the chart */}
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<rect
						style={{
							fill: 'lightgrey',
						}}
						width={innerWidth}
						height={innerHeight}
					/>
				</g>

				<g transform={'translate(0,0)'}>
					<AxisLabel
						orient="left"
						width={margin.left}
						height={height}
						label="Left"
					/>
				</g>

				<g transform={`translate(${margin.left + innerWidth}, 0)`}>
					<AxisLabel
						orient="right"
						color={chartConstants.COLOR_0}
						width={margin.right}
						height={height}
						label="Right"
					/>
				</g>

				<g transform={`translate(0, ${margin.top + innerHeight})`}>
					<AxisLabel
						orient="bottom"
						color={chartConstants.COLOR_1}
						width={width}
						height={margin.bottom}
						label="Bottom"
					/>
				</g>

				<g transform={'translate(0, 0)'}>
					<AxisLabel
						orient="top"
						color={chartConstants.COLOR_2}
						width={width}
						height={margin.top}
						label="Top"
					/>
				</g>
			</svg>
		);
	},
});
