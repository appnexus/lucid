import React from 'react';
import createClass from 'create-react-class';
import { LineChart, chartConstants } from '../../../index';

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

export default createClass({
	render() {
		return (
			<LineChart
				data={data}
				yAxisFields={['apples', 'oranges', 'pears', 'bananas', 'kiwis']}
				yAxisIsStacked={true}
				yAxisHasPoints={false}
				yAxisTitle="Fruit Count"
				palette={chartConstants.PALETTE_MONOCHROME_0_5}
			/>
		);
	},
});
