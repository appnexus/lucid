import _ from 'lodash';
import React from 'react';
import d3Scale from 'd3-scale';
import { Motion, spring } from 'react-motion';

import Axis from '../Axis';
import Button from '../../Button/Button';
import Point from '../../Point/Point';

export default React.createClass({
	getInitialState() {
		return {
			data: [
				{x: 1, y: 2, color: 1},
				{x: 10, y: 15, color: 2},
				{x: 5, y: 20, color: 3},
				{x: 3, y: 5, color: 4},
			],
			margin: {top: 10, right: 10, bottom: 50, left: 50},
			width: 600,
			height: 400,
		}
	},

	handleRandomize() {
		const randomLengthArray = _.times(_.random(5, 50));
		const data = _.map(randomLengthArray, () => {
			return {
				x: _.random(1, 250),
				y: _.random(1, 250),
				color: _.random(1, 5),
			}
		});
		this.setState({ data });
	},

	render() {
		const {
			margin,
			width,
			height,
			data,
		} = this.state;

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const x = d3Scale.scaleLinear()
			.domain([0, _.max(_.map(data, 'x'))])
			.range([0, innerWidth]);

		const y = d3Scale.scaleLinear()
			.domain([0, _.max(_.map(data, 'y'))])
			.range([innerHeight, 0]);

		/*
		const time = d3Scale.scaleTime()
			.domain([_.min(dateData), _.max(dateData)])
			.range([0, innerWidth]);
		*/

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
				>
					{/* Push the y axis to the right margin with a translate */}
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<Axis scale={y} orient='left' />
					</g>
					{/* Push the x axis to the bottom margin with a translate */}
					<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
						<Axis scale={x} />
					</g>
					{/* Scatter plot */}
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						{_.map(data, (d) => (
							<Motion
								defaultStyle={{
									x: x(d.x),
									y: y(d.y),
									opacity: 0,
								}}
								style={{
									x: spring(x(d.x)),
									y: spring(y(d.y)),
									opacity: spring(1),
								}}
								>
								{value => (
									<Point
										kind={d.color}
										color={d.color}
										key={`${d.x}|${d.y}`}
										x={value.x}
										y={value.y}
										style={{
											opacity: value.opacity
										}}
									/>
								)}
							</Motion>
						))}
					</g>
				</svg>
				<pre style={{
					maxHeight: 200,
					overflow: 'auto',
					whiteSpace: 'normal',
				}}>
					{JSON.stringify(data)}
				</pre>
			</div>
		);
	}
});
