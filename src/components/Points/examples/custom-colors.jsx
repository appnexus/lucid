import _ from 'lodash';
import React from 'react';
import Points from '../Points';
import * as d3Scale from 'd3-scale';
import * as chartConstants from '../../../constants/charts';

const width = 1000;
const height = 400;
const margin = {top: 10, right: 10, bottom: 10, left: 10};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const data = [
	{ x: 'one'   , y0: 4 , y1: 5 , y2: 6 , y3: 7 } ,
	{ x: 'two'   , y0: 3 , y1: 4 , y2: 5 , y3: 6 } ,
	{ x: 'three' , y0: 2 , y1: 3 , y2: 4 , y3: 5 } ,
	{ x: 'four'  , y0: 1 , y1: 2 , y2: 3 , y3: 4 } ,
	{ x: 'five'  , y0: 2 , y1: 3 , y2: 4 , y3: 5 } ,
	{ x: 'six'   , y0: 3 , y1: 4 , y2: 5 , y3: 6 } ,
	{ x: 'seven' , y0: 4 , y1: 5 , y2: 6 , y3: 7 } ,
];

const yFields = ['y0', 'y1', 'y2', 'y3'];
const yMax = _.max(_.reduce(yFields, (acc, field) => {
	return acc.concat(_.map(data, field));
}, []));

const xScale = d3Scale.scalePoint()
	.domain(_.map(data, 'x'))
	.range([0, innerWidth]);

const yScale = d3Scale.scaleLinear()
	.domain([0, yMax])
	.range([innerHeight, 0]);

export default React.createClass({
	render() {
		return (
			<svg width={width} height={height}>
				<Points
					top={margin.top}
					left={margin.left}
					data={data}
					xScale={xScale}
					yScale={yScale}
					yFields={yFields}
					colorMap={{
						y0: chartConstants.COLOR_BAD,
						y1: chartConstants.COLOR_GOOD,
						y2: '#ff8800',
						y3: '#abc123',
					}}
				/>
			</svg>
		);
	},
});
