import _ from 'lodash';
import React from 'react';
import { Meta, Story } from '@storybook/react';

import * as chartConstants from '../../constants/charts';
import PieChart, { IPieChartProps } from './PieChart';
import Legend from '../Legend/Legend';

export default {
	title: 'Visualizations/PieChart',
	component: PieChart,
	parameters: {
		docs: {
			description: {
				component: PieChart.peek.description,
			},
		},
	},
	args: PieChart.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<IPieChartProps> = (args) => {
	const data = [
		{ x: 'Leslie', y: 60 },
		{ x: 'Ron', y: 40 },
		{ x: 'Tom', y: 30 },
		{ x: 'Gary', y: 20 },
		{ x: 'Ben', y: 15 },
	];

	const style = {
		paddingTop: '4rem',
	};

	return (
		<section style={style}>
			<PieChart data={data} />
			<PieChart
				data={data}
				{...args}
				palette={chartConstants.PALETTE_MONOCHROME_0_5}
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_1_5}
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_2_5}
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_3_5}
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_4_5}
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_5_5}
			/>
		</section>
	);
};

/* Basic Donuts */
export const BasicDonuts: Story<IPieChartProps> = (args) => {
	/* eslint-disable comma-spacing */

	const data = [
		{ x: 'Leslie', y: 60 },
		{ x: 'Ron', y: 40 },
		{ x: 'Tom', y: 30 },
		{ x: 'Gary', y: 20 },
		{ x: 'Ben', y: 15 },
	];

	const style = {
		paddingTop: '4rem',
	};

	return (
		<section style={style}>
			<PieChart {...args} data={data} isDonut />
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_0_5}
				isDonut
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_1_5}
				isDonut
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_2_5}
				isDonut
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_3_5}
				isDonut
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_4_5}
				isDonut
			/>
			<PieChart
				{...args}
				data={data}
				palette={chartConstants.PALETTE_MONOCHROME_5_5}
				isDonut
			/>
		</section>
	);
};

/* Legend */
export const LegendTest: Story<IPieChartProps> = (args) => {
	const data = [
		{ x: 'Leslie', y: 80 },
		{ x: 'Tom', y: 20 },
		{ x: 'Ron', y: 10 },
		{ x: 'Ann', y: 30 },
	];

	const palette = chartConstants.PALETTE_7;

	const style = {
		display: 'flex',
		alignItems: 'center',
		paddingTop: '4rem',
	};

	return (
		<section style={style}>
			<PieChart {...args} data={data} palette={palette} />
			<Legend>
				{_.map(data, (d, index) => (
					<Legend.Item
						key={index}
						color={palette[index % palette.length]}
						hasPoint
						pointKind={1}
					>
						{d.x}
					</Legend.Item>
				))}
			</Legend>
		</section>
	);
};

/* Color Map */
export const ColorMap: Story<IPieChartProps> = (args) => {
	/* eslint-disable comma-spacing */

	const data = [
		{ x: 'Leslie', y: 100 },
		{ x: 'Tom', y: 20 },
		{ x: 'Ron', y: 10 },
		{ x: 'Ann', y: 30 },
		{ x: 'Tammy', y: 40 },
	];

	const style = {
		paddingTop: '4rem',
	};

	return (
		<section style={style}>
			<PieChart
				{...args}
				data={data}
				colorMap={{
					Tammy: chartConstants.COLOR_BAD,
					Leslie: chartConstants.COLOR_GOOD,
				}}
			/>
		</section>
	);
};

/* Percents */
export const Percents: Story<IPieChartProps> = (args) => {
	/* eslint-disable comma-spacing */

	const data = [
		{ x: 'Leslie', y: 60 },
		{ x: 'Ron', y: 40 },
		{ x: 'Tom', y: 30 },
		{ x: 'Gary', y: 20 },
		{ x: 'Ben', y: 15 },
	];

	const total = _.sum(_.map(data, 'y'));

	const style = {
		paddingTop: '4rem',
	};

	return (
		<section style={style}>
			<PieChart
				{...args}
				data={data}
				yAxisFormatter={(value: number) => {
					return `${((value / total) * 100).toFixed(1)}%`;
				}}
			/>
		</section>
	);
};

/* Small With No Stroke Or Hover */
export const SmallWithNoStrokeOrHover: Story<IPieChartProps> = (args) => {
	const data = [
		{ x: 'Leslie', y: 60 },
		{ x: 'Ron', y: 40 },
		{ x: 'Tom', y: 30 },
		{ x: 'Gary', y: 20 },
		{ x: 'Ben', y: 15 },
	];

	const style = {
		paddingTop: '4rem',
	};

	return (
		<section style={style}>
			<PieChart
				{...args}
				margin={{
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				}}
				width={25}
				height={25}
				data={data}
				hasStroke={false}
				isHovering={false}
			/>
		</section>
	);
};
