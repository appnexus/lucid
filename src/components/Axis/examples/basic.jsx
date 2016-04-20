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
				new Date('2016-01-01'),
				new Date('2016-01-03'),
				new Date('2016-01-07'),
			],
			margin: {top: 10, right: 10, bottom: 50, left: 50},
			width: 600,
			height: 400,
		}
	},

	handleRandomize() {
		const data = _.map(_.times(_.random(5, 20)), () => _.random(1, 10));
		this.setState({ data });
	},

	handleScaleSwitch() {

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

		const x = d3Scale.scaleLinear()
			.domain([_.min(data), _.max(data)])
			.range([0, insideWidth]);

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
				>
					{/* Push the axis to the bottom margin with a translate */}
					<g transform={`translate(${margin.left}, ${insideHeight})`}>
						<Axis
							kind='x'
							size={insideWidth}
							scale={time}
							ticks={time.ticks(d3Time.timeDay, 1)}
						/>
					</g>
				</svg>
			</div>
		);
	}
});
