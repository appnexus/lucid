/* eslint-disable comma-spacing */

import _ from 'lodash';
import React from 'react';
import createReactClass from 'create-react-class';
import { Bars, d3Scale } from '../../../index';

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
const yMax = _.max(
	_.reduce(
		yFields,
		(acc, field) => {
			return acc.concat(_.map(data, field));
		},
		[]
	)
);

const xScale = d3Scale
	.scaleBand()
	.domain(_.map(data, 'x'))
	.range([0, width])
	.round(true)
	.paddingInner(0.1);

const yScale = d3Scale.scaleLinear().domain([0, yMax]).range([height, 0]);

export default createReactClass({
	render() {
		return (
			<div>
				<svg width={width} height={height}>
					<Bars
						data={data}
						xScale={xScale}
						yScale={yScale}
						yFields={yFields}
						hasToolTips
					/>
				</svg>

				<svg width={width} height={height}>
					<Bars
						data={data}
						xScale={xScale}
						yScale={yScale}
						yFields={yFields}
						isStacked={true}
						hasToolTips
					/>
				</svg>
			</div>
		);
	},
});
