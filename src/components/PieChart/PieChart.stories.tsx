import React from 'react';
import createClass from 'create-react-class';
import { PieChart, Legend, chartConstants } from './../../index';
import _ from 'lodash';

export default {
	title: 'Visualizations/Charts/PieChart',
	component: PieChart,
	parameters: {
		docs: {
			description: {
				component: (PieChart as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
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

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<PieChart data={data} />
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_0_5}
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_1_5}
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_2_5}
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_3_5}
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_4_5}
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_5_5}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Basic Donuts */
export const BasicDonuts = () => {
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

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<PieChart data={data} isDonut />
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_0_5}
						isDonut
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_1_5}
						isDonut
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_2_5}
						isDonut
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_3_5}
						isDonut
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_4_5}
						isDonut
					/>
					<PieChart
						data={data}
						palette={chartConstants.PALETTE_MONOCHROME_5_5}
						isDonut
					/>
				</div>
			);
		},
	});

	return <Component />;
};
BasicDonuts.storyName = 'BasicDonuts';

/* Legend */
export const LegendTest = () => {
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

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<PieChart data={data} palette={palette} />
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
				</div>
			);
		},
	});

	return <Component />;
};
LegendTest.storyName = 'Legend';

/* Color Map */
export const ColorMap = () => {
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

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<PieChart
						data={data}
						colorMap={{
							Tammy: chartConstants.COLOR_BAD,
							Leslie: chartConstants.COLOR_GOOD,
						}}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ColorMap.storyName = 'ColorMap';

/* Percents */
export const Percents = () => {
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

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<PieChart
						data={data}
						yAxisFormatter={(value: number) => {
							return `${((value / total) * 100).toFixed(1)}%`;
						}}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Percents.storyName = 'Percents';

/* Small With No Stroke Or Hover */
export const SmallWithNoStrokeOrHover = () => {
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

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<PieChart
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
				</div>
			);
		},
	});

	return <Component />;
};
SmallWithNoStrokeOrHover.storyName = 'SmallWithNoStrokeOrHover';
