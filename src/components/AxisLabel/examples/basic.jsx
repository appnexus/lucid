import React from 'react';
import AxisLabel from '../AxisLabel';

const width = 1000;
const height = 400;
const margin = { top: 50, right: 50, bottom: 50, left: 50};

const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

export default React.createClass({
	render() {
		return (
			<svg width={width} height={height}>
				{/* dotted outline for the svg */}
				<rect
					width={width}
					height={height}
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
							fill: 'lightgrey'
						}}
						width={innerWidth}
						height={innerHeight}
					/>
				</g>

				<g transform={`translate(0,0)`}>
					<AxisLabel
						orient='left'
						width={margin.left}
						height={height}
						label='Left'
					/>
				</g>

				<g transform={`translate(${margin.left + innerWidth}, 0)`}>
					<AxisLabel
						orient='right'
						color={0}
						width={margin.right}
						height={height}
						label='Right'
					/>
				</g>

				<g transform={`translate(0, ${margin.top + innerHeight})`}>
					<AxisLabel
						orient='bottom'
						color={1}
						width={width}
						height={margin.bottom}
						label='Bottom'
					/>
				</g>

				<g transform={`translate(0, 0)`}>
					<AxisLabel
						orient='top'
						color={2}
						width={width}
						height={margin.top}
						label='Top'
					/>
				</g>
			</svg>
		);
	}
});

