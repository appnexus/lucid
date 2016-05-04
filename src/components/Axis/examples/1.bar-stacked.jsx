import _ from 'lodash';
import React from 'react';
import d3Scale from 'd3-scale';

import Axis from '../Axis';
import Button from '../../Button/Button';
import Bars from '../../Bars/Bars';

export default React.createClass({
	getInitialState() {
		return {
			groupedData: [
				{x: 'one', y: [1, 2, 3, 4]},
				{x: 'two', y: [5, 4, 3, 2]},
				{x: 'three', y: [5, 4, 3, 2]},
				{x: 'four', y: [5, 4, 3, 2]},
				{x: 'five', y: [5, 4, 3, 2]},
				{x: 'six', y: [5, 4, 3, 2]},
			],
			margin: {top: 10, right: 20, bottom: 50, left: 50},
			width: 1000,
			height: 400,
		}
	},

	handleRandomize() {
		const groupedData = _.map(['one', 'two', 'three', 'four', 'five', 'six'], (x) => {
			return {
				x,
				y: _.map(_.times(_.random(5, 15)), () => _.random(1, 250)),
			}
		});

		this.setState({ groupedData });
	},

	render() {
		const {
			margin,
			width,
			height,
			groupedData,
		} = this.state;

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const domain = _.map(groupedData, 'x');

		const xScale = d3Scale.scaleBand()
			.align(0.5)
			.padding(0.4)
			.domain(domain)
			.range([0, innerWidth]);

		const yScale = d3Scale.scaleLinear()
			.domain([0, _.max(_.flatMap(groupedData, 'y'))])
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
						<Axis scale={yScale} orient='left' />
					</g>
					{/* Push the x axis to the bottom margin with a translate */}
					<g transform={`translate(${margin.left}, ${innerHeight + margin.top})`}>
						<Axis
							scale={xScale}
							outerTickSize={0}
							ticks={domain}
						/>
					</g>
					<Bars
						top={margin.top}
						left={margin.left}
						groupedData={groupedData}
						xScale={xScale}
						yScale={yScale}
					/>
				</svg>
			</div>
		);
	}
});
