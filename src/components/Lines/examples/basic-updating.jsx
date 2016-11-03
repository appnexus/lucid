import _ from 'lodash';
import React from 'react';
import {
	Lines,
	Button,
	d3Scale,
} from '../../../index';

const width = 1000;
const height = 400;

function r() {
	return _.random(1, 20);
}

function generateData() {
	return [
		{ x: 'one'   , y0: r() , y1: r() , y2: r() , y3: r() } ,
		{ x: 'two'   , y0: r() , y1: r() , y2: r() , y3: r() } ,
		{ x: 'three' , y0: r() , y1: r() , y2: r() , y3: r() } ,
		{ x: 'four'  , y0: r() , y1: r() , y2: r() , y3: r() } ,
		{ x: 'five'  , y0: r() , y1: r() , y2: r() , y3: r() } ,
		{ x: 'six'   , y0: r() , y1: r() , y2: r() , y3: r() } ,
	]
}


export default React.createClass({
	getInitialState() {
		return {
			data: generateData(),
		};
	},

	handleNewDataClick() {
		this.setState({ data: generateData() });
	},

	render() {
		const { data } = this.state;

		const yFields = ['y0', 'y1', 'y2', 'y3'];
		const yMax = _.max(_.reduce(yFields, (acc, field) => {
			return acc.concat(_.map(data, field));
		}, []));

		const xScale = d3Scale.scalePoint()
			.domain(_.map(data, 'x'))
			.range([0, width]);

		const yScale = d3Scale.scaleLinear()
			.domain([0, yMax])
			.range([height, 0]);

		return (
			<div>
				<Button onClick={this.handleNewDataClick}>New Data</Button>

				<svg width={width} height={height}>
					<Lines
						data={data}
						xScale={xScale}
						yScale={yScale}
						yFields={yFields}
					/>
				</svg>

				<svg width={width} height={height}>
					<Lines
						data={data}
						xScale={xScale}
						yScale={yScale}
						yFields={yFields}
						isStacked={true}
					/>
				</svg>
			</div>
		);
	},
});
