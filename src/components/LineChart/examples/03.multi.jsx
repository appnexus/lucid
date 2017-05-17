import React from 'react';
import createClass from 'create-react-class';
import { LineChart } from '../../../index';

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

export default createClass({
	render() {
		return (
			<LineChart
				data={data}
				yAxisFields={['apples', 'oranges', 'pears']}
				yAxisTitle="Fruit Count"
			/>
		);
	},
});
