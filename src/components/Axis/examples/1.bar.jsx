import _ from 'lodash';
import React from 'react';
import d3Scale from 'd3-scale';
import d3Shape from 'd3-shape';

import Axis from '../Axis';
import Button from '../../Button/Button';

export default React.createClass({
	getInitialState() {
		return {
			data: [
				{x: 'one', y: 5},
				{x: 'two', y: 25},
				{x: 'three', y: 50},
				{x: 'four', y: 200},
				{x: 'five', y: 250},
			],
			margin: {top: 10, right: 20, bottom: 50, left: 50},
			width: 1000,
			height: 400,
		}
	},

	handleRandomize() {
		const randomLengthArray = _.times(_.random(5, 50));
		const data = _.map(randomLengthArray, () => {
			return {
				x: new Date(_.random(1388563200000, 1451635200000)),
				y: _.random(1, 250),
			}
		});
		const sortedData = _.sortBy(data, 'x');
		this.setState({ data: sortedData });
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

		const domain = _.uniq(_.map(data, 'x'));

		const x = d3Scale.scaleBand()
			.domain(domain)
			.range([0, innerWidth]);

		const y = d3Scale.scaleLinear()
			.domain([0, _.max(_.map(data, 'y'))])
			.range([innerHeight, 0]);

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
						<Axis
							scale={x}
							ticks={domain}
						/>
					</g>
					{/* line + scatter */}
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<text>Yolo</text>
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
