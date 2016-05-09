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
			series: [
				[
					{x: new Date('2015-01-01'), y: 5},
					{x: new Date('2015-03-01'), y: 25},
					{x: new Date('2015-06-01'), y: 50},
					{x: new Date('2015-08-01'), y: 200},
					{x: new Date('2016-02-03'), y: 250},
				],
				[
					{x: new Date('2015-01-01'), y: 200},
					{x: new Date('2015-03-01'), y: 175},
					{x: new Date('2015-06-01'), y: 25},
					{x: new Date('2015-08-01'), y: 10},
					{x: new Date('2016-02-03'), y: 5},
				],
				[
					{x: new Date('2015-01-01'), y: 250},
					{x: new Date('2015-03-01'), y: 100},
					{x: new Date('2015-06-01'), y: 70},
					{x: new Date('2015-08-01'), y: 50},
					{x: new Date('2016-02-03'), y: 20},
				]
			],
			margin: {top: 10, right: 20, bottom: 50, left: 50},
			width: 1000,
			height: 400,
		}
	},

	handleRandomize() {
		const randomDates = _.map(_.times(10), () => new Date(_.random(1388563200000, 1451635200000)));
		const series = _.map(_.times(6), () => {
			return _.chain(_.times(10))
				.map((i) => ({ x: randomDates[i], y: _.random(1, 250) }))
				.sortBy('x')
				.value();
		});

		this.setState({ series });
	},

	render() {
		const {
			margin,
			width,
			height,
			series,
		} = this.state;

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const allSeries = _.flatten(series);

		const x = d3Scale.scaleTime()
			.domain([_.min(_.map(allSeries, 'x')), _.max(_.map(allSeries, 'x'))])
			.range([0, innerWidth]);

		const y = d3Scale.scaleLinear()
			.domain([0, _.max(_.map(allSeries, 'y'))])
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
						<Axis scale={x} tickCount={2} />
					</g>
					{/* line + scatter */}
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						{_.map(series, (s, i) =>
							<g>
								<path
									className={`line line-${i}`}
									d={line(s)}
									style={{
										strokeWidth: 2,
										fill: 'none',
									}}
								/>
								{_.map(s, (d) =>
									<Point
										x={x(d.x)}
										y={y(d.y)}
										kind={i}
										color={i}
										hasStroke={true}
									/>
								)}
							</g>
						)}
					</g>
				</svg>
			</div>
		);
	}
});
