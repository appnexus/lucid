import React from 'react';
import _ from 'lodash';
import { Bars, d3Scale } from '../../../index';

const data: Array<{ [key: string]: string | number }> = [
	{ x: 'one', y: 10 },
	{ x: 'two', y: 100 },
	{ x: 'three', y: 1000 },
	{ x: 'four', y: 10000 },
	{ x: 'five', y: 100000 }
];

const width = 750;
const height = 400;


const yScale = d3Scale
	.scaleLog()
	.domain([1, 1000000])
	.range([height, 0]);

const xScale = d3Scale
	.scaleBand()
	.domain(_.map(data, 'x') as string[])
	.range([0, width]);

export default function App() {
	return (
		<svg height={600} width={1000}>
			<g>
				<Bars data={data} xScale={xScale} yScale={yScale} />
			</g>
			<g>
				{_.map(data, item => {
					return (
						<text
							textAnchor='middle'
							x={xScale(item.x as string) as number + xScale.bandwidth() / 2}
							y={yScale(item.y as number) as any - 10}
							fill='gray'
						>
							{item.y}
						</text>
					);
				})}
			</g>
		</svg>
	);
}
