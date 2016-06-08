import _ from 'lodash';
import React from 'react';
import Lines from '../Lines';
import * as d3Scale from 'd3-scale';

const width = 1000;
const height = 400;

const data = [
	{ x: 'one', y0: 1, y1: 2, y2: 3, y3: 5 },
	{ x: 'two', y0: 2, y1: 3, y2: 4, y3: 6 },
	{ x: 'three', y0: 2, y1: 4, y2: 5, y3: 6 },
	{ x: 'four', y0: 3, y1: 6, y2: 7, y3: 7 },
	{ x: 'five', y0: 4, y1: 8, y2: 9, y3: 8 },
	{ x: 'six', y0: 20, y1: 8, y2: 9, y3: 1 },
];

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

export default React.createClass({
	render() {
		return (
			<div>
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
