import _ from 'lodash';
import React from 'react';
import { Meta, Story } from '@storybook/react';

import Bars, { IBarsProps } from '../Bars/Bars';
import * as chartConstants from '../../constants/charts';
import * as d3Scale from 'd3-scale';

export default {
	title: 'Private/Bars',
	component: Bars,
	parameters: {
		docs: {
			description: {
				component: Bars.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IBarsProps> = (args) => {
	/* eslint-disable comma-spacing */

	const width = 750;
	const height = 400;

	const data: Array<{ [key: string]: string | number }> = [
		{ x: 'one', y0: 1, y1: 2, y2: 3, y3: 5 },
		{ x: 'two', y0: 2, y1: 3, y2: 4, y3: 6 },
		{ x: 'three', y0: 2, y1: 4, y2: 5, y3: 6 },
		{ x: 'four', y0: 3, y1: 6, y2: 7, y3: 7 },
		{ x: 'five', y0: 4, y1: 8, y2: 9, y3: 8 },
		{ x: 'six', y0: 11, y1: 8, y2: 9, y3: 5 },
	];

	const yFields = ['y0', 'y1', 'y2', 'y3'];
	const yMax = _.max(
		_.reduce(
			yFields,
			(acc: number[], field: string) => {
				return acc.concat(_.map(data, field) as number[]);
			},
			[]
		)
	);

	const xScale = d3Scale
		.scaleBand()
		.domain(_.map(data, 'x') as string[])
		.range([0, width])
		.round(true)
		.paddingInner(0.1);

	const yScale = d3Scale
		.scaleLinear()
		.domain([0, yMax as any])
		.range([height, 0]);

	const style = {
		paddingTop: '9rem',
	};

	return (
		<div style={style}>
			<svg width={width} height={height}>
				<Bars
					{...args}
					data={data}
					xScale={xScale}
					yScale={yScale}
					yFields={yFields}
					hasToolTips
				/>
			</svg>

			<svg width={width} height={height}>
				<Bars
					{...args}
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
};

/* Custom Colors */
export const CustomColors: Story<IBarsProps> = (args) => {
	/* eslint-disable comma-spacing */

	const width = 750;
	const height = 400;

	const data = [
		{ x: 'one', y0: 1, y1: 2, y2: 3, y3: 5 },
		{ x: 'two', y0: 2, y1: 3, y2: 4, y3: 6 },
		{ x: 'three', y0: 2, y1: 4, y2: 5, y3: 6 },
		{ x: 'four', y0: 3, y1: 6, y2: 7, y3: 7 },
		{ x: 'five', y0: 4, y1: 8, y2: 9, y3: 8 },
		{ x: 'six', y0: 11, y1: 8, y2: 9, y3: 5 },
	];

	const yFields = ['y0', 'y1', 'y2', 'y3'];
	const yMax = _.max(
		_.reduce(
			yFields,
			(acc, field) => {
				return acc.concat(_.map(data, field) as any);
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

	const yScale = d3Scale
		.scaleLinear()
		.domain([0, yMax as any])
		.range([height, 0]);

	const style = {
		paddingTop: '9rem',
	};

	return (
		<div style={style}>
			<svg width={width} height={height}>
				<Bars
					{...args}
					data={data}
					xScale={xScale}
					yScale={yScale}
					yFields={yFields}
					colorMap={{
						y0: chartConstants.COLOR_GOOD,
						y2: chartConstants.COLOR_BAD,
					}}
					hasToolTips
				/>
			</svg>
		</div>
	);
};

/* Log Scale */
export const LogScale: Story<IBarsProps> = (args) => {
	const data: Array<{ [key: string]: string | number }> = [
		{ x: 'one', y: 10 },
		{ x: 'two', y: 100 },
		{ x: 'three', y: 1000 },
		{ x: 'four', y: 10000 },
		{ x: 'five', y: 100000 },
	];

	const width = 750;
	const height = 400;

	const yScale = d3Scale.scaleLog().domain([1, 1000000]).range([height, 0]);

	const xScale = d3Scale
		.scaleBand()
		.domain(_.map(data, 'x') as string[])
		.range([0, width]);

	return (
		<svg height={600} width={1000}>
			<g>
				<Bars {...args} data={data} xScale={xScale} yScale={yScale} />
			</g>
			<g>
				{_.map(data, (item, idx) => {
					return (
						<text
							key={idx}
							textAnchor='middle'
							x={(xScale(item.x as string) as number) + xScale.bandwidth() / 2}
							y={(yScale(item.y as number) as any) - 10}
							fill='gray'
						>
							{item.y}
						</text>
					);
				})}
			</g>
		</svg>
	);
};
