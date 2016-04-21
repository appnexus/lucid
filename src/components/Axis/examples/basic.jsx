import _ from 'lodash';
import React from 'react';
import d3Scale from 'd3-scale';
import d3Time from 'd3-time';

import Axis from '../Axis';
import Button from '../../Button/Button';

export default React.createClass({
	getInitialState() {
		return {
			data: [1,2,3,4,5,6,8,9,9],
			dateData: [
				new Date('2014-01-01'),
				new Date('2016-01-03'),
				new Date('2016-01-07'),
			],
			margin: {top: 10, right: 10, bottom: 50, left: 50},
			width: 600,
			height: 400,
		}
	},

	handleRandomize() {
		const randomLengthArray = _.times(_.random(2, 20));
		const data = _.map(randomLengthArray, () => _.random(1, 250));
		const dateData = _.map(randomLengthArray, () => new Date(_.random(1388563200000, 1451635200000)));
		this.setState({ data, dateData });
	},

	render() {
		const {
			margin,
			width,
			height,
			data,
			dateData,
		} = this.state;

		const insideWidth = width - margin.left - margin.right;
		const insideHeight = height - margin.top - margin.bottom;

		// 		const x = d3Scale.scaleLinear()
		// 			.domain([_.min(data), _.max(data)])
		// 			.range([0, insideWidth]);

		const y = d3Scale.scaleLinear()
			.domain([_.min(data), _.max(data)])
			.range([0, insideHeight]);

		const time = d3Scale.scaleTime()
			.domain([_.min(dateData), _.max(dateData)])
			.range([0, insideWidth]);

		return (
			<div>
				<Button
					onClick={this.handleRandomize}
					style={{ verticalAlign: 'top' }}
				>
					Randomize
				</Button>
				<svg
					width={width}
					height={height}
					style={{outline: '1px solid black'}}
				>
				{/* Dashed rectangle to show the body */}
				<rect
					x={margin.left}
					y={margin.top}
					width={insideWidth}
					height={insideHeight}
					style={{
						fill: 'none',
						stroke: 'black',
						strokeWidth: 1,
						strokeDasharray: '3',
						shapeRendering: 'crispEdges',
					}}
				/>
					{/* Push the y axis to the right margin with a translate */}
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<Axis scale={y} orient='left' />
					</g>
					{/* Push the x axis to the bottom margin with a translate */}
					<g transform={`translate(${margin.left}, ${insideHeight + margin.top})`}>
						<Axis
							scale={time}
						/>
					</g>
				</svg>
			</div>
		);
	}
});
