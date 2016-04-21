import _ from 'lodash';
import React from 'react';
import d3Scale from 'd3-scale';
import d3Time from 'd3-time';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Axis from '../Axis';
import Button from '../../Button/Button';

export default React.createClass({
	getInitialState() {
		return {
			data: [
				{x: 1, y: 2},
				{x: 10, y: 15},
				{x: 5, y: 20},
				{x: 3, y: 5},
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

		const insideWidth = width - margin.left - margin.right;
		const insideHeight = height - margin.top - margin.bottom;

		const x = d3Scale.scaleLinear()
			.domain([_.min(_.map(data, 'x')), _.max(_.map(data, 'x'))])
			.range([0, insideWidth]);

		const y = d3Scale.scaleLinear()
			.domain([_.min(_.map(data, 'y')), _.max(_.map(data, 'y'))])
			.range([0, insideHeight]);

		/*
		const time = d3Scale.scaleTime()
			.domain([_.min(dateData), _.max(dateData)])
			.range([0, insideWidth]);
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
					<g transform={`translate(${margin.left}, ${insideHeight + margin.top})`}>
						<Axis scale={x} />
					</g>
					{/* Scatter plot */}
					<ReactCSSTransitionGroup
						transitionName={'circles'}
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
						component='g'
						transform={`translate(${margin.left}, ${margin.top})`}
					>
						{_.map(data, (d) =>
							<circle
								className={'circle'}
								key={`${d.x}|${d.y}`}
								cx={x(d.x)}
								cy={y(d.y)}
								r={4}
							/>
						)}
					</ReactCSSTransitionGroup>
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
