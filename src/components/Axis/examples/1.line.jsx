import _ from 'lodash';
import React from 'react';
import d3Scale from 'd3-scale';
import d3Shape from 'd3-shape';

import Axis from '../Axis';
import Button from '../../Button/Button';
import Point from '../../Point/Point';

export default React.createClass({
	getInitialState() {
		return {
			data: [
				{x: new Date('2015-01-01'), y: 5},
				{x: new Date('2015-03-01'), y: 25},
				{x: new Date('2015-06-01'), y: 50},
				{x: new Date('2015-08-01'), y: 200},
				{x: new Date('2016-02-03'), y: 250},
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

		const x = d3Scale.scaleTime()
			.domain([_.min(_.map(data, 'x')), _.max(_.map(data, 'x'))])
			.range([0, innerWidth]);

		const y = d3Scale.scaleLinear()
			.domain([0, _.max(_.map(data, 'y'))])
			.range([innerHeight, 0]);

		const line = d3Shape.line()
			.x((d) => x(d.x))
			.y((d) => y(d.y));
			// .curve(d3Shape.curveMonotoneX);

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
					{/* line + scatter */}
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<path
							className={'line'}
							d={line(data)}
							style={{
								strokeWidth: 2,
								fill: 'none',
							}}
						/>
						{_.map(data, (d) =>
							<Point
								x={x(d.x)}
								y={y(d.y)}
								kind={1, 5}
								hasStroke={true}
							/>
						)}
					</g>
				</svg>
			</div>
		);
	}
});
