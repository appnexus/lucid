import React from 'react';
import createClass from 'create-react-class';
import { LineChart } from '../../../index';

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

export default createClass({
	render() {
		return (
			<LineChart
				data={data}
				margin={{
					right: 80,
				}}
				hasLegend
				yAxisFields={['apples']}
				yAxisColorOffset={3}
				y2AxisFields={['pears']}
				y2AxisColorOffset={4}
			/>
		);
	},
});
