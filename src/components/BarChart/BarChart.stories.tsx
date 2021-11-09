import React from 'react';
import createClass from 'create-react-class';
import { BarChart, Legend, chartConstants, formatters } from './../../index';
import _ from 'lodash';
import Resizer from '../Resizer/Resizer';

export default {
	title: 'Visualizations/Charts/BarChart',
	component: BarChart,
	parameters: {
		docs: {
			description: {
				component: (BarChart as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const data = [
		{ x: '2015-01-01', y: 1 },
		{ x: '2015-01-02', y: 2 },
		{ x: '2015-01-03', y: 3 },
		{ x: '2015-01-04', y: 5 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisTitle='Revenue'
						margin={{ top: 20 } as any}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Basic Responsive */
export const BasicResponsive = () => {
	const data = [
		{ x: '2015-01-01', y: 1 },
		{ x: '2015-01-02', y: 2 },
		{ x: '2015-01-03', y: 3 },
		{ x: '2015-01-04', y: 5 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<Resizer>
						{(width /*, height */) => (
							<BarChart
								width={width}
								height={width * 0.3}
								data={data}
								yAxisTitle='Revenue'
							/>
						)}
					</Resizer>
				</div>
			);
		},
	});

	return <Component />;
};
BasicResponsive.storyName = 'BasicResponsive';

/* Grouped */
export const Grouped = () => {
	/* eslint-disable comma-spacing */

	const data = [
		{
			x: 'Monday',
			apples: 10,
			pears: 20,
			peaches: 35,
			bananas: 15,
			oranges: 5,
		},
		{
			x: 'Tuesday',
			apples: 20,
			pears: 5,
			peaches: 20,
			bananas: 25,
			oranges: 27,
		},
		{
			x: 'Wednesday',
			apples: 5,
			pears: 15,
			peaches: 5,
			bananas: 20,
			oranges: 35,
		},
	];

	const style = {
		paddingTop: '10rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisFields={['apples', 'pears', 'peaches', 'bananas', 'oranges']}
						yAxisMin={0}
						yAxisTitle='Fruit Count'
						palette={chartConstants.PALETTE_30}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Grouped.storyName = 'Grouped';

/* Grouped With Legend */
export const GroupedWithLegend = () => {
	/* eslint-disable comma-spacing */

	const data = [
		{
			x: 'Monday',
			apples: 10,
			pears: 20,
			peaches: 35,
			bananas: 15,
			oranges: 5,
		},
		{
			x: 'Tuesday',
			apples: 20,
			pears: 5,
			peaches: 20,
			bananas: 25,
			oranges: 27,
		},
		{
			x: 'Wednesday',
			apples: 5,
			pears: 15,
			peaches: 5,
			bananas: 20,
			oranges: 35,
		},
	];
	const yAxisFields = ['apples', 'pears', 'peaches', 'bananas', 'oranges'];
	const palette = chartConstants.PALETTE_7;

	const style = {
		paddingTop: '10rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisFields={yAxisFields}
						yAxisMin={0}
						yAxisTitle='Fruit Count'
						palette={palette}
					/>

					<Legend style={{ verticalAlign: 'top' }}>
						{_.map(yAxisFields, (field, i) => (
							<Legend.Item
								key={field}
								hasPoint
								color={palette[i % palette.length]}
							>
								{field}
							</Legend.Item>
						))}
					</Legend>
				</div>
			);
		},
	});

	return <Component />;
};
GroupedWithLegend.storyName = 'GroupedWithLegend';

/* Limited Ticks */
export const LimitedTicks = () => {
	const data = [
		{ x: '2015-01-01', y: 1 },
		{ x: '2015-01-02', y: 2 },
		{ x: '2015-01-03', y: 3 },
		{ x: '2015-01-04', y: 5 },
		{ x: '2015-01-05', y: 2 },
		{ x: '2015-01-06', y: 3 },
		{ x: '2015-01-07', y: 2 },
		{ x: '2015-01-08', y: 2 },
		{ x: '2015-01-09', y: 5 },
		{ x: '2015-01-10', y: 3 },
		{ x: '2015-01-11', y: 4 },
		{ x: '2015-01-12', y: 4 },
		{ x: '2015-01-13', y: 5 },
		{ x: '2015-01-14', y: 3 },
		{ x: '2015-01-15', y: 4 },
		{ x: '2015-01-16', y: 3 },
		{ x: '2015-01-17', y: 6 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisMin={0}
						xAxisTickCount={5}
						yAxisTickCount={4}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
LimitedTicks.storyName = 'LimitedTicks';

/* All The Things */
export const AllTheThings = () => {
	/* eslint-disable comma-spacing */

	const data = [
		{ day: 'monday', apples: 2000, oranges: 3000 },
		{ day: 'tuesday', apples: 2000, oranges: 5000 },
		{ day: 'wednesday', apples: 3000, oranges: 2000 },
		{ day: 'thursday', apples: 5000, oranges: 6000 },
	];
	const yFormatter = (d: any) => `${d / 1000}k`;
	const xFormatter = (d: any) => d.toUpperCase().slice(0, 3);

	const style = {
		paddingTop: '6rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						colorMap={{
							apples: chartConstants.COLOR_GOOD,
							oranges: chartConstants.COLOR_1,
						}}
						xAxisField='day'
						xAxisFormatter={xFormatter}
						xAxisTickCount={5}
						xAxisTitle='Weekdays'
						yAxisFields={['apples', 'oranges']}
						yAxisFormatter={yFormatter}
						yAxisTitle='Fruit Count'
						yAxisTickCount={4}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
AllTheThings.storyName = 'AllTheThings';

/* Stacked */
export const Stacked = () => {
	const data = [
		{ x: 'Monday', apples: 10, pears: 20, peaches: 35 },
		{ x: 'Tuesday', apples: 20, pears: 5, peaches: 20 },
		{ x: 'Wednesday', apples: 5, pears: 15, peaches: 5 },
	];

	const style = {
		paddingTop: '7rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisFields={['apples', 'pears', 'peaches']}
						yAxisMin={0}
						yAxisIsStacked={true}
						yAxisTitle='Fruit Count'
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Stacked.storyName = 'Stacked';

/* Unformatted Tooltips */
export const UnformattedTooltips = () => {
	const data = [
		{ x: '2015-01-01', y: 1200 },
		{ x: '2015-01-02', y: 900 },
		{ x: '2015-01-03', y: 1800 },
		{ x: '2015-01-04', y: 3000 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisTitle='Revenue'
						yAxisTooltipFormatter={(yField, yValueFormatted, yValue) => yValue}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
UnformattedTooltips.storyName = 'UnformattedTooltips';

/* Formatted Tooltip Values */
export const FormattedTooltipValues = () => {
	const data = [
		{ x: '2015-01-01', y: 1200 },
		{ x: '2015-01-02', y: 900 },
		{ x: '2015-01-03', y: 1800 },
		{ x: '2015-01-04', y: 3000 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisTitle='Revenue'
						yAxisTooltipDataFormatter={
							formatters.formatAbbreviatedNumber as any
						}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
FormattedTooltipValues.storyName = 'FormattedTooltipValues';

/* Formatted Tooltips */
export const FormattedTooltips = () => {
	const data = [
		{ x: '2015-01-01', y: 1200 },
		{ x: '2015-01-02', y: 900 },
		{ x: '2015-01-03', y: 1800 },
		{ x: '2015-01-04', y: 3000 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						width={750}
						data={data}
						yAxisTitle='Revenue'
						renderTooltipBody={(dataPoint: any) =>
							`x value = ${dataPoint.x} and y value = ${dataPoint.y}`
						}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
FormattedTooltips.storyName = 'FormattedTooltips';

/* Empty */
export const Empty = () => {
	const Component = createClass({
		render() {
			return <BarChart width={750} data={[]} yAxisTitle='Revenue' />;
		},
	});

	return <Component />;
};
Empty.storyName = 'Empty';

/* Empty With Custom Title And Body */
export const EmptyWithCustomTitleAndBody = () => {
	const {
		EmptyStateWrapper,
		EmptyStateWrapper: { Title, Body },
	} = BarChart;

	const Component = createClass({
		render() {
			return (
				<BarChart width={750} data={[]} yAxisTitle='Revenue'>
					<EmptyStateWrapper>
						<Title>Something went wrong.</Title>
						<Body
							style={{
								fontSize: '12px',
							}}
						>
							Echo park poutine esse tempor squid do. Lo-fi ramps XOXO
							chicharrones laboris, portland fugiat locavore. Fap four dollar
							toast keytar, cronut kogi fingerstache distillery microdosing
							everyday carry austin DIY dreamcatcher. Distillery flexitarian
							meditation laboris roof party. Cred raclette gastropub tilde
							PBR&B. Shoreditch poke adipisicing, reprehenderit lumbersexual
							succulents mustache officia franzen vinyl nostrud af. Hashtag
							bitters organic, before they sold out butcher cronut sapiente.
						</Body>
					</EmptyStateWrapper>
				</BarChart>
			);
		},
	});

	return <Component />;
};
EmptyWithCustomTitleAndBody.storyName = 'EmptyWithCustomTitleAndBody';

/* Many Bars */
export const ManyBars = () => {
	const data = _.map(_.range(0, 70), (n) => ({
		x: (new Date(0) as any) + n * 60 * 60 * 24,
		y: n,
	}));

	const style = {
		paddingTop: '5rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<BarChart
						data={data}
						xAxisTextOrientation='diagonal'
						yAxisTextOrientation='horizontal'
						xAxisTickCount={20}
						height={600}
						width={750}
						margin={{ bottom: 300, left: 300 } as any}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ManyBars.storyName = 'ManyBars';
