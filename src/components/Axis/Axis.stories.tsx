import React from 'react';
import { Story, Meta } from '@storybook/react';

import * as d3Scale from 'd3-scale';
import * as d3Time from 'd3-time';
import Axis, { IAxisProps } from './Axis';

export default {
	title: 'Visualizations/Axis',
	component: Axis,
	parameters: {
		docs: {
			description: {
				component: Axis.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IAxisProps> = (args) => {
	const margin = { right: 40, left: 20, top: 40, bottom: 10 };
	const width = 500;
	const height = 100;
	const innerWidth = width - margin.right - margin.left;
	const x = d3Scale.scaleLinear().domain([0, 100000]).range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, ${height / 2})`}>
				<Axis {...args} scale={x} orient='bottom' tickCount={6} />
			</g>
		</svg>
	);
};

/* Top */
export const Top: Story<IAxisProps> = (args) => {
	const margin = { right: 20, left: 20 };
	const width = 400;
	const height = 50;
	const innerWidth = width - margin.right - margin.left;
	const x = d3Scale.scaleLinear().domain([0, 100000]).range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, ${height / 2})`}>
				<Axis
					{...args}
					scale={x}
					orient='top'
					textOrientation='horizontal'
					tickCount={6}
				/>
			</g>
		</svg>
	);
};

/* Left */
export const Left: Story<IAxisProps> = (args) => {
	const margin = { top: 10, bottom: 10 };
	const width = 50;
	const height = 200;
	const innerHeight = height - margin.top - margin.bottom;
	const y = d3Scale.scaleLinear().domain([0, 100000]).range([innerHeight, 0]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${width - 1}, ${margin.top})`}>
				<Axis {...args} scale={y} orient='left' />
			</g>
		</svg>
	);
};

/* Right */
export const Right: Story<IAxisProps> = (args) => {
	const margin = { top: 10, bottom: 10 };
	const width = 50;
	const height = 200;
	const innerHeight = height - margin.top - margin.bottom;
	const y = d3Scale.scaleLinear().domain([0, 50]).range([innerHeight, 0]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(0, ${margin.top})`}>
				<Axis {...args} scale={y} orient='right' textOrientation='horizontal' />
			</g>
		</svg>
	);
};

/* Time */
export const Time: Story<IAxisProps> = (args) => {
	const margin = { right: 10, left: 30 };
	const width = 400;
	const height = 200;
	const innerWidth = width - margin.right - margin.left;

	const x: any = d3Scale
		.scaleTime()
		.domain([new Date('2015-01-01'), new Date('2017-02-01')])
		.range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, 1)`}>
				<Axis {...args} orient='bottom' scale={x} />
			</g>

			<g transform={`translate(${margin.left}, ${(height / 3) * 1})`}>
				<Axis
					{...args}
					orient='bottom'
					scale={x}
					ticks={x.ticks(d3Time.timeMonth, 6)}
				/>
			</g>

			<g transform={`translate(${margin.left}, ${(height / 3) * 2})`}>
				<Axis
					{...args}
					orient='bottom'
					scale={x}
					ticks={x.ticks(d3Time.timeYear, 1)}
				/>
			</g>
		</svg>
	);
};

/* Ordinal */
export const Ordinal: Story<IAxisProps> = (args) => {
	const margin = { right: 20, left: 20 };
	const width = 400;
	const height = 40;
	const innerWidth = width - margin.right - margin.left;

	const x: any = d3Scale
		.scaleBand()
		.domain(['a', 'b', 'c', 'd'])
		.range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, 1)`}>
				<Axis {...args} orient='bottom' scale={x} />
			</g>
		</svg>
	);
};

/* Diagonal Text */
export const DiagonalText: Story<IAxisProps> = (args) => {
	// individual margin values may need to be changed to
	// prevent or add extra padding depending on use of axis.
	const margin = { right: 40, left: 20, top: 40, bottom: 10 };
	const horizontalAxisWidth = 500;
	const horizontalAxisHeight = 100;
	const verticalAxisWidth = 100;
	const verticalAxisHeight = 200;
	const innerWidth = horizontalAxisWidth - margin.right - margin.left;
	const innerHeight = verticalAxisHeight - margin.top - margin.bottom;
	const x = d3Scale.scaleLinear().domain([0, 100000]).range([0, innerWidth]);
	const y = d3Scale.scaleLinear().domain([0, 100000]).range([innerHeight, 0]);

	return (
		<div>
			<div>
				<p>top</p>
				<svg width={horizontalAxisWidth} height={horizontalAxisHeight}>
					<g
						transform={`translate(${margin.left}, ${horizontalAxisHeight / 2})`}
					>
						<Axis
							{...args}
							scale={x}
							orient='top'
							textOrientation='diagonal'
							tickCount={6}
						/>
					</g>
				</svg>
			</div>
			<div>
				<p>bottom</p>
				<svg width={horizontalAxisWidth} height={horizontalAxisHeight}>
					<g
						transform={`translate(${margin.left}, ${horizontalAxisHeight / 2})`}
					>
						<Axis
							{...args}
							scale={x}
							orient='bottom'
							textOrientation='diagonal'
							tickCount={6}
						/>
					</g>
				</svg>
			</div>
			<div>
				<p>right</p>
				<svg width={verticalAxisWidth} height={verticalAxisHeight}>
					<g transform={`translate(0, ${margin.top})`}>
						<Axis
							{...args}
							scale={y}
							orient='right'
							textOrientation='diagonal'
							tickCount={6}
						/>
					</g>
				</svg>
			</div>
			<div>
				<p>left</p>
				<svg width={verticalAxisWidth} height={verticalAxisHeight}>
					<g transform={`translate(${verticalAxisWidth - 1}, ${margin.top})`}>
						<Axis
							{...args}
							scale={y}
							orient='left'
							textOrientation='diagonal'
							tickCount={6}
						/>
					</g>
				</svg>
			</div>
		</div>
	);
};
