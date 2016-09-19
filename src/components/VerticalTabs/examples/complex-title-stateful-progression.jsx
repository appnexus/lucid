import _ from 'lodash';
import React from 'react';
import {
	d3Scale,
	Lines,
	SuccessIcon,
	VerticalTabs,
	WarningIcon,
} from '../../../index';

const titleOne = (
	<span>
		<h2 style={{margin: 0}}>One</h2>
		<SuccessIcon />
		<span style={{fontWeight: 'normal', color: '#333', marginLeft: '5px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
	</span>
);
const titleTwo = (
	<span>
		<h2 style={{margin: 0}}>Two</h2>
		<WarningIcon />
		<span style={{fontWeight: 'normal', color: '#333', marginLeft: '5px'}}>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
	</span>
);

const data = [
	{ x: 1, y: 1 },
	{ x: 2, y: 0 },
	{ x: 3, y: 3 },
	{ x: 4, y: 2 },
	{ x: 5, y: 1 },
	{ x: 6, y: 3 },
];
const width = 200;
const height = 50;
const xScale = d3Scale.scalePoint()
	.domain(_.map(data, 'x'))
	.range([0, width]);

const yScale = d3Scale.scaleLinear()
	.domain([0, 4])
	.range([height, 0]);

const titleThree = (
	<span>
		<h2 style={{margin: 0}}>Performance</h2>
		<svg width={width} height={height}>
			<Lines
				data={data}
				xScale={xScale}
				yScale={yScale}
			/>
		</svg>
	</span>
);

export default React.createClass({
	render() {
		return (
			<div>
				<VerticalTabs>
					<VerticalTabs.Tab Title={titleOne}>One content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title={titleTwo}>Two content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title={titleThree}>Three content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title='Four'>Four content</VerticalTabs.Tab>
				</VerticalTabs>
			</div>
		);
	},
});
