import React from 'react';
import LineChart from '../LineChart';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), apples: 2, oranges: 8},
	{ x: new Date('2015-03-02T00:00:00-08:00'), apples: 2, oranges: 5},
	{ x: new Date('2015-05-03T00:00:00-08:00'), apples: 3, oranges: 5},
	{ x: new Date('2015-07-04T00:00:00-08:00'), apples: 5, oranges: 6},
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
				yAxisTitle='Number of Apples'
				yAxisTitleColor={0}

				y2AxisFields={['oranges']}
				y2AxisTitle='Number of Oranges'
				y2AxisTitleColor={1}
			/>
		);
	}
});
