import React from 'react';
import _ from 'lodash';
import { Bars, d3Scale, Axis } from '../../../index';

const data = [
	{ x: 'Imps Matched', y: 1000000 },
	{ x: 'Bid Requests', y: 980000 },
	{ x: 'Bids', y: 110000 },
	{ x: 'Auctions Won', y: 3200 },
	{ x: 'Imps Rendered', y: 320 },
];

const height = 600;
const width = 1000;
const margins = { top: 50, right: 75, bottom: 50, left: 75 };

const innerWidth = width - margins.left - margins.right;
const innerHeight = height - margins.top - margins.bottom;

const yScale = d3Scale
	.scaleLog()
	.domain([1, 1000000])
	.range([innerHeight, 0]);

const xScale = d3Scale
	.scaleBand()
	.domain([
		'Imps Matched',
		'Bid Requests',
		'Bids',
		'Auctions Won',
		'Imps Rendered',
	])
	.range([0, innerWidth])
	.paddingInner(0.4);

//This is to build center bars
const buildConnectingBars = (item, item2) => {
	return (
		xScale(item.x) +
		margins.left +
		Math.floor(xScale.bandwidth()) +
		',' +
		(yScale(item.y) + margins.top) +
		' ' +
		(xScale(item2.x) + margins.left) +
		',' +
		(yScale(item2.y) + margins.top) +
		' ' +
		(xScale(item2.x) + margins.left) +
		',' +
		(height - margins.bottom) +
		' ' +
		(xScale(item.x) + margins.left + Math.floor(xScale.bandwidth())) +
		',' +
		(height - margins.bottom)
	);
};

export default function App() {
	return (
		<svg height={600} width={1000}>
			<g transform={`translate(${margins.right}, ${margins.top})`}>
				<Bars data={data} xScale={xScale} yScale={yScale} />
				<Axis scale={yScale} orient={'left'} />
			</g>
			<g>
				<Axis
					scale={xScale}
					transform={`translate(${margins.right}, ${innerHeight +
						margins.top})`}
				/>
			</g>
			<g>
				{_.map(data, item => {
					return (
						<text
							textAnchor='middle'
							x={xScale(item.x) + margins.left + xScale.bandwidth() / 2} //To x position of number labels
							y={yScale(item.y) + margins.top - 10} //To y position of number labels
							fill='gray'
						>
							{item.y.toLocaleString('en-US', {
								notation: 'compact',
								compactDisplay: 'short',
							})}
						</text>
					);
				})}
			</g>
			<g>
				{_.map(data, (item, index) => {
					if (!_.isEmpty(data[index + 1])) {
						const item2 = data[index + 1];
						return (
							<polygon
								fill='lightgray'
								stroke='lightgray'
								points={buildConnectingBars(item, item2)}
							/>
						);
					}
				})}
			</g>
		</svg>
	);
}
