import _ from 'lodash';
import React from 'react';
import d3Scale from 'd3-scale';
import {Motion, spring} from 'react-motion';

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
		const data = _.map(['one', 'two', 'three', 'four', 'five'], (x) => {
			return {
				x,
				y: _.random(1, 250),
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

		const domain = _.uniq(_.map(data, 'x'));

		const x = d3Scale.scaleBand()
			.align(0.5)
			.padding(0.4)
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
							outerTickSize={0}
							ticks={domain}
						/>
					</g>
					{/* bars */}
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						{_.map(data, (d) =>
							<Motion defaultStyle={{height: 0}} style={{height: spring(innerHeight - y(d.y))}}>
								{value =>
									<rect
										className='bar'
										key={d.x}
										x={x(d.x)}
										y={innerHeight - value.height}
										height={value.height}
										width={x.bandwidth()}
									/>
								}
							</Motion>
						)}
					</g>
				</svg>
			</div>
		);
	}
});
