import React from 'react';
import LineChart from '../LineChart';

const data = [
	{ date: new Date('2015-01-01T00:00:00-08:00'), apples: 2000, oranges: 3000 },
	{ date: new Date('2015-01-02T00:00:00-08:00'), apples: 2000, oranges: 5000 },
	{ date: new Date('2015-01-03T00:00:00-08:00'), apples: 3000, oranges: 2000 },
	{ date: new Date('2015-01-04T00:00:00-08:00'), apples: 5000               },
	{ date: new Date('2015-01-05T00:00:00-08:00'), apples: 2500, oranges: 6300 },
	{ date: new Date('2015-01-06T00:00:00-08:00'), apples: 1500, oranges: 6100 },
];
const yFormatter = (d) => `${d / 1000}k`;
const xFormatter = (d) => `${d.getMonth() + 1}-${d.getDate()}`;

export default React.createClass({
	render() {
		return (
			<LineChart
				data={data}
				legend={{
					apples: 'Apples',
					oranges: 'Oranges',
				}}

				xAxisField='date'
				xAxisFormatter={xFormatter}
				xAxisMin={new Date('2014-12-31T00:00-08:00')}
				xAxisMax={new Date('2015-01-07T00:00-08:00')}
				xAxisTickCount={5}
				xAxisTitle='Date'

				yAxisFields={['apples']}
				yAxisFormatter={yFormatter}
				yAxisTickCount={5}
				yAxisTitle='Number of Apples'
				yAxisTitleColor={0}

				y2AxisFields={['oranges']}
				y2AxisFormatter={yFormatter}
				y2AxisTickCount={5}
				y2AxisTitle='Number of Oranges'
				y2AxisTitleColor={1}
				y2AxisHasPoints={false}
			/>
		);
	},
});
