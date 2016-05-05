import React from 'react';
import LineChart from '../LineChart';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), apples: 2, oranges: 3},
	{ x: new Date('2015-01-02T00:00:00-08:00'), apples: 2, oranges: 5},
	{ x: new Date('2015-01-03T00:00:00-08:00'), apples: 3, oranges: 2},
	{ x: new Date('2015-01-04T00:00:00-08:00'), apples: 5, oranges: 6},
];

export default React.createClass({
	render() {
		return (
			<LineChart
				data={data}
				margin={{
					top: 10,
					right: 80,
					bottom: 50,
					left: 80,
				}}
				yAxisFields={['apples']}
				y2AxisFields={['oranges']}
			/>
		);
	}
});
