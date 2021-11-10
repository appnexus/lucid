import React from 'react';
import createClass from 'create-react-class';
import { LineChart, Legend, chartConstants, formatters } from './../../index';
import _ from 'lodash';
import Resizer from '../Resizer/Resizer';
import Button from '../Button/Button';

export default {
	title: 'Visualizations/LineChart',
	component: LineChart,
	parameters: {
		docs: {
			description: {
				component: (LineChart as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const data = [
		{ x: new Date('2015-01-01T00:00:00-08:00'), y: 1 },
		{ x: new Date('2015-01-02T00:00:00-08:00'), y: 0 },
		{ x: new Date('2015-01-03T00:00:00-08:00'), y: 3 },
		{ x: new Date('2015-01-04T00:00:00-08:00'), y: 5 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart data={data} width={800} />
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Responsive */
export const Responsive = () => {
	const data = [
		{ x: new Date('2015-01-01T00:00:00-08:00'), y: 1 },
		{ x: new Date('2015-01-02T00:00:00-08:00'), y: 2 },
		{ x: new Date('2015-01-03T00:00:00-08:00'), y: 3 },
		{ x: new Date('2015-01-04T00:00:00-08:00'), y: 5 },
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
							<LineChart width={width} height={width * 0.3} data={data} />
						)}
					</Resizer>
				</div>
			);
		},
	});

	return <Component />;
};
Responsive.storyName = 'Responsive';

/* Multi */
export const Multi = () => {
	const data = [
		{
			x: new Date('2015-01-01T00:00:00-08:00'),
			apples: 184,
			oranges: 142,
			pears: 117,
		},
		{
			x: new Date('2015-01-02T00:00:00-08:00'),
			apples: 191,
			oranges: 145,
			pears: 118,
		},
		{
			x: new Date('2015-01-03T00:00:00-08:00'),
			apples: 114,
			oranges: 107,
			pears: 103,
		},
		{
			x: new Date('2015-01-04T00:00:00-08:00'),
			apples: 24,
			oranges: 62,
			pears: 85,
		},
		{
			x: new Date('2015-01-05T00:00:00-08:00'),
			apples: 4,
			oranges: 52,
			pears: 81,
		},
		{
			x: new Date('2015-01-06T00:00:00-08:00'),
			apples: 72,
			oranges: 86,
			pears: 94,
		},
		{
			x: new Date('2015-01-07T00:00:00-08:00'),
			apples: 166,
			oranges: 133,
			pears: 113,
		},
		{
			x: new Date('2015-01-08T00:00:00-08:00'),
			apples: 199,
			oranges: 149,
			pears: 120,
		},
		{
			x: new Date('2015-01-09T00:00:00-08:00'),
			apples: 141,
			oranges: 121,
			pears: 108,
		},
		{
			x: new Date('2015-01-10T00:00:00-08:00'),
			apples: 46,
			oranges: 73,
			pears: 89,
		},
		{
			x: new Date('2015-01-11T00:00:00-08:00'),
			apples: 0,
			oranges: 50,
			pears: 80,
		},
		{
			x: new Date('2015-01-12T00:00:00-08:00'),
			apples: 46,
			oranges: 73,
			pears: 89,
		},
		{
			x: new Date('2015-01-13T00:00:00-08:00'),
			apples: 142,
			oranges: 121,
			pears: 108,
		},
		{
			x: new Date('2015-01-14T00:00:00-08:00'),
			apples: 199,
			oranges: 150,
			pears: 120,
		},
		{
			x: new Date('2015-01-15T00:00:00-08:00'),
			apples: 165,
			oranges: 133,
			pears: 113,
		},
		{
			x: new Date('2015-01-16T00:00:00-08:00'),
			apples: 71,
			oranges: 86,
			pears: 94,
		},
		{
			x: new Date('2015-01-17T00:00:00-08:00'),
			apples: 4,
			oranges: 52,
			pears: 81,
		},
		{
			x: new Date('2015-01-18T00:00:00-08:00'),
			apples: 25,
			oranges: 62,
			pears: 85,
		},
		{
			x: new Date('2015-01-19T00:00:00-08:00'),
			apples: 115,
			oranges: 107,
			pears: 103,
		},
		{
			x: new Date('2015-01-20T00:00:00-08:00'),
			apples: 191,
			oranges: 146,
			pears: 118,
		},
		{
			x: new Date('2015-01-21T00:00:00-08:00'),
			apples: 184,
			oranges: 142,
			pears: 117,
		},
		{
			x: new Date('2015-01-22T00:00:00-08:00'),
			apples: 99,
			oranges: 100,
			pears: 100,
		},
		{
			x: new Date('2015-01-23T00:00:00-08:00'),
			apples: 15,
			oranges: 58,
			pears: 83,
		},
		{
			x: new Date('2015-01-24T00:00:00-08:00'),
			apples: 9,
			oranges: 55,
			pears: 82,
		},
		{
			x: new Date('2015-01-25T00:00:00-08:00'),
			apples: 87,
			oranges: 93,
			pears: 97,
		},
		{
			x: new Date('2015-01-26T00:00:00-08:00'),
			apples: 176,
			oranges: 138,
			pears: 115,
		},
		{
			x: new Date('2015-01-27T00:00:00-08:00'),
			apples: 196,
			oranges: 148,
			pears: 119,
		},
		{
			x: new Date('2015-01-28T00:00:00-08:00'),
			apples: 127,
			oranges: 114,
			pears: 105,
		},
		{
			x: new Date('2015-01-29T00:00:00-08:00'),
			apples: 3,
			oranges: 67,
			pears: 87,
		},
	];

	const style = {
		paddingTop: '8rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						yAxisFields={['apples', 'oranges', 'pears']}
						yAxisTitle='Fruit Count'
						width={800}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Multi.storyName = 'Multi';

/* Multi With Legend */
export const MultiWithLegend = () => {
	const data = [
		{
			x: new Date('2015-01-01T00:00:00-08:00'),
			apples: 2,
			oranges: 3,
			pears: 1,
		},
		{
			x: new Date('2015-01-02T00:00:00-08:00'),
			apples: 2,
			oranges: 5,
			pears: 6,
		},
		{
			x: new Date('2015-01-03T00:00:00-08:00'),
			apples: 3,
			oranges: 2,
			pears: 4,
		},
		{
			x: new Date('2015-01-04T00:00:00-08:00'),
			apples: 5,
			oranges: 6,
			pears: 1,
		},
	];
	const yAxisFields = ['apples', 'oranges', 'pears'];
	const palette = chartConstants.PALETTE_MONOCHROME_2_5;

	const style = {
		paddingTop: '8rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						yAxisFields={yAxisFields}
						yAxisTitle='Fruit Count'
						palette={palette}
						width={800}
					/>

					<Legend style={{ verticalAlign: 'top' }}>
						{_.map(yAxisFields, (field, i) => (
							<Legend.Item
								key={field}
								hasPoint
								hasLine
								color={palette[i % palette.length]}
								pointKind={i}
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
MultiWithLegend.storyName = 'MultiWithLegend';

/* Stacked */
export const Stacked = () => {
	const data = [
		{
			x: new Date('2015-01-01T00:00:00-08:00'),
			apples: 2,
			oranges: 3,
			pears: 1,
			bananas: 7,
			kiwis: 5,
			cherries: 3,
		},
		{
			x: new Date('2015-01-02T00:00:00-08:00'),
			apples: 2,
			oranges: 5,
			pears: 6,
			bananas: 7,
			kiwis: 5,
			cherries: 5,
		},
		{
			x: new Date('2015-01-03T00:00:00-08:00'),
			apples: 3,
			oranges: 2,
			pears: 4,
			bananas: 7,
			kiwis: 5,
			cherries: 2,
		},
		{
			x: new Date('2015-01-04T00:00:00-08:00'),
			apples: 5,
			oranges: 6,
			pears: 1,
			bananas: 7,
			kiwis: 5,
			cherries: 1,
		},
		{
			x: new Date('2015-01-05T00:00:00-08:00'),
			apples: 4,
			oranges: 3,
			pears: 2,
			bananas: 7,
			kiwis: 5,
			cherries: 3,
		},
		{
			x: new Date('2015-01-06T00:00:00-08:00'),
			apples: 3,
			oranges: 4,
			pears: 4,
			bananas: 7,
			kiwis: 5,
			cherries: 5,
		},
	];

	const style = {
		paddingTop: '11rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						yAxisFields={[
							'apples',
							'oranges',
							'pears',
							'bananas',
							'kiwis',
							'cherries',
						]}
						yAxisIsStacked={true}
						yAxisTitle='Fruit Count'
						width={800}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Stacked.storyName = 'Stacked';

/* Dual Axis */
export const DualAxis = () => {
	const data = [
		{ x: new Date('2015-01-01T00:00:00-08:00'), bananas: 2, cherries: 8 },
		{ x: new Date('2015-03-02T00:00:00-08:00'), bananas: 2, cherries: 5 },
		{ x: new Date('2015-05-03T00:00:00-08:00'), bananas: 3, cherries: 5 },
		{ x: new Date('2015-07-04T00:00:00-08:00'), bananas: 5, cherries: 6 },
	];

	const style = {
		paddingTop: '5rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						margin={{
							right: 80,
						}}
						width={800}
						colorMap={{
							bananas: chartConstants.COLOR_4,
							cherries: chartConstants.COLOR_2,
						}}
						yAxisFields={['bananas']}
						yAxisTitle='Number of Bananas'
						yAxisTitleColor={chartConstants.COLOR_4}
						y2AxisFields={['cherries']}
						y2AxisTitle='Number of Cherries'
						y2AxisTitleColor={chartConstants.COLOR_2}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
DualAxis.storyName = 'DualAxis';

/* All The Things */
export const AllTheThings = () => {
	const data = [
		{
			date: new Date('2015-01-01T00:00:00-08:00'),
			blueberries: 2000,
			oranges: 3000,
		},
		{
			date: new Date('2015-01-02T00:00:00-08:00'),
			blueberries: 2000,
			oranges: 5000,
		},
		{
			date: new Date('2015-01-03T00:00:00-08:00'),
			blueberries: 3000,
			oranges: 2000,
		},
		{ date: new Date('2015-01-04T00:00:00-08:00'), blueberries: 5000 },
		{
			date: new Date('2015-01-05T00:00:00-08:00'),
			blueberries: 2500,
			oranges: 6300,
		},
		{
			date: new Date('2015-01-06T00:00:00-08:00'),
			blueberries: 1500,
			oranges: 6100,
		},
	];
	const yFormatter = (d: number) => `${d / 1000}k`;
	const xFormatter = (d: Date) => `${d.getMonth() + 1}-${d.getDate()}`;

	const style = {
		paddingTop: '5rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						margin={{
							right: 80,
						}}
						width={800}
						data={data}
						colorMap={{
							blueberries: chartConstants.COLOR_0,
							oranges: chartConstants.COLOR_1,
						}}
						xAxisField='date'
						xAxisFormatter={xFormatter}
						xAxisMin={new Date('2014-12-31T00:00-08:00')}
						xAxisMax={new Date('2015-01-07T00:00-08:00')}
						xAxisTickCount={5}
						xAxisTitle='Date'
						yAxisFields={['blueberries']}
						yAxisFormatter={yFormatter}
						yAxisTickCount={5}
						yAxisTitle='Number of Blueberries'
						yAxisTitleColor={chartConstants.COLOR_0}
						y2AxisFields={['oranges']}
						y2AxisFormatter={yFormatter}
						y2AxisTickCount={5}
						y2AxisTitle='Number of Oranges'
						y2AxisHasPoints={false}
						y2AxisTitleColor={chartConstants.COLOR_1}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
AllTheThings.storyName = 'AllTheThings';

/* Stacked Single Series With Formatters */
export const StackedSingleSeriesWithFormatters = () => {
	const data = [
		{ x: new Date('2015-01-01T00:00:00-08:00'), y: 1.55 },
		{ x: new Date('2015-01-02T00:00:00-08:00'), y: 2.67 },
		{ x: new Date('2015-01-03T00:00:00-08:00'), y: 3.31 },
		{ x: new Date('2015-01-04T00:00:00-08:00'), y: 5.99 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						yAxisIsStacked
						yAxisFormatter={(yValue) => `$ ${yValue}`}
						yAxisTooltipFormatter={(yField, yValueFormatted) => yValueFormatted}
						data={data}
						width={800}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
StackedSingleSeriesWithFormatters.storyName =
	'StackedSingleSeriesWithFormatters';

/* Stacked Monochrome No Shapes */
export const StackedMonochromeNoShapes = () => {
	const data = [
		{
			x: new Date('2015-01-01T00:00:00-08:00'),
			apples: 2,
			oranges: 3,
			pears: 1,
			bananas: 7,
			kiwis: 5,
		},
		{
			x: new Date('2015-01-02T00:00:00-08:00'),
			apples: 2,
			oranges: 5,
			pears: 6,
			bananas: 7,
			kiwis: 5,
		},
		{
			x: new Date('2015-01-03T00:00:00-08:00'),
			apples: 3,
			oranges: 2,
			pears: 4,
			bananas: 7,
			kiwis: 5,
		},
		{
			x: new Date('2015-01-04T00:00:00-08:00'),
			apples: 5,
			oranges: 6,
			pears: 1,
			bananas: 7,
			kiwis: 5,
		},
		{
			x: new Date('2015-01-05T00:00:00-08:00'),
			apples: 4,
			oranges: 3,
			pears: 2,
			bananas: 7,
			kiwis: 5,
		},
		{
			x: new Date('2015-01-06T00:00:00-08:00'),
			apples: 3,
			oranges: 4,
			pears: 4,
			bananas: 7,
			kiwis: 5,
		},
	];

	const style = {
		paddingTop: '10rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						width={800}
						yAxisFields={['apples', 'oranges', 'pears', 'bananas', 'kiwis']}
						yAxisIsStacked={true}
						yAxisHasPoints={false}
						yAxisTitle='Fruit Count'
						palette={chartConstants.PALETTE_MONOCHROME_0_5}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
StackedMonochromeNoShapes.storyName = 'StackedMonochromeNoShapes';

/* Abbreviated Numbers */
export const AbbreviatedNumbers = () => {
	const data = [
		{ x: new Date('2015-01-07T00:00:00-08:00'), blueberries: 1030872156 },
		{ x: new Date('2015-01-08T00:00:00-08:00'), blueberries: 4002156 },
		{ x: new Date('2015-01-09T00:00:00-08:00'), blueberries: 214872156 },
		{ x: new Date('2015-01-10T00:00:00-08:00'), blueberries: 42872156 },
		{ x: new Date('2015-01-11T00:00:00-08:00'), blueberries: 4230872156 },
	];

	const style = {
		paddingTop: '4rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						width={800}
						yAxisFields={['blueberries']}
						yAxisFormatter={formatters.formatAbbreviatedNumber}
						yAxisTooltipDataFormatter={formatters.formatThousands}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
AbbreviatedNumbers.storyName = 'AbbreviatedNumbers';

/* Color Offset */
export const ColorOffset = () => {
	const data = [
		{ x: new Date('2015-01-01T00:00:00-08:00'), apples: 184, pears: 117 },
		{ x: new Date('2015-01-02T00:00:00-08:00'), apples: 191, pears: 118 },
		{ x: new Date('2015-01-03T00:00:00-08:00'), apples: 114, pears: 103 },
		{ x: new Date('2015-01-04T00:00:00-08:00'), apples: 24, pears: 85 },
		{ x: new Date('2015-01-05T00:00:00-08:00'), apples: 4, pears: 81 },
		{ x: new Date('2015-01-06T00:00:00-08:00'), apples: 72, pears: 94 },
		{ x: new Date('2015-01-07T00:00:00-08:00'), apples: 166, pears: 113 },
		{ x: new Date('2015-01-08T00:00:00-08:00'), apples: 199, pears: 120 },
		{ x: new Date('2015-01-09T00:00:00-08:00'), apples: 141, pears: 108 },
		{ x: new Date('2015-01-10T00:00:00-08:00'), apples: 46, pears: 89 },
		{ x: new Date('2015-01-11T00:00:00-08:00'), apples: 0, pears: 80 },
		{ x: new Date('2015-01-12T00:00:00-08:00'), apples: 46, pears: 89 },
		{ x: new Date('2015-01-13T00:00:00-08:00'), apples: 142, pears: 108 },
		{ x: new Date('2015-01-14T00:00:00-08:00'), apples: 199, pears: 120 },
		{ x: new Date('2015-01-15T00:00:00-08:00'), apples: 165, pears: 113 },
	];

	const style = {
		paddingTop: '5rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						margin={{
							right: 80,
						}}
						width={800}
						hasLegend
						yAxisFields={['apples']}
						yAxisColorOffset={3}
						y2AxisFields={['pears']}
						y2AxisColorOffset={4}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ColorOffset.storyName = 'ColorOffset';

/* Empty */
export const Empty = () => {
	const Component = createClass({
		render() {
			return <LineChart data={[]} yAxisFields={['blueberries']} width={800} />;
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
	} = LineChart;

	const Component = createClass({
		render() {
			return (
				<LineChart data={[]} yAxisFields={['blueberries']} width={800}>
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
				</LineChart>
			);
		},
	});

	return <Component />;
};
EmptyWithCustomTitleAndBody.storyName = 'EmptyWithCustomTitleAndBody';

/* Empty With Button */
export const EmptyWithButton = () => {
	const {
		EmptyStateWrapper,
		EmptyStateWrapper: { Title, Body },
	} = LineChart;

	const Component = createClass({
		render() {
			return (
				<LineChart data={[]} yAxisFields={['blueberries']} width={800}>
					<EmptyStateWrapper>
						<Title>Something went wrong.</Title>
						<Body
							style={{
								fontSize: '12px',
							}}
						>
							<Button>Action</Button>
						</Body>
					</EmptyStateWrapper>
				</LineChart>
			);
		},
	});

	return <Component />;
};
EmptyWithButton.storyName = 'EmptyWithButton';

/* Loading */
export const Loading = () => {
	const Component = createClass({
		render() {
			return <LineChart data={[]} width={800} isLoading />;
		},
	});

	return <Component />;
};
Loading.storyName = 'Loading';

/* Fine Grained Ticks */
export const FineGrainedTicks = () => {
	const data = [
		{ x: new Date('2018-01-01T00:00:00-0800'), y: 1 },
		{ x: new Date('2018-01-02T00:00:00-0800'), y: 2 },
		{ x: new Date('2018-01-03T00:00:00-0800'), y: 3 },
	];

	const style = {
		paddingTop: '5rem',
	};

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<LineChart
						data={data}
						width={800}
						xAxisTicks={_.map(data, 'x')}
						xAxisFormatter={(date) => date.toLocaleDateString()}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
FineGrainedTicks.storyName = 'FineGrainedTicks';
