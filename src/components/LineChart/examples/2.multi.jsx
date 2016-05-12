import React from 'react';
import LineChart from '../LineChart';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), apples: 2, oranges: 3, pears: 1 },
	{ x: new Date('2015-01-02T00:00:00-08:00'), apples: 2, oranges: 5, pears: 6 },
	{ x: new Date('2015-01-03T00:00:00-08:00'), apples: 3, oranges: 2, pears: 4 },
	{ x: new Date('2015-01-04T00:00:00-08:00'), apples: 5, oranges: 6, pears: 1 },
];

export default React.createClass({
	render() {
		return (
			<LineChart
				data={data}
				yAxisFields={['apples', 'oranges', 'pears']}
				yAxisTitle='Fruit Count'
			/>
		);
	}
});
