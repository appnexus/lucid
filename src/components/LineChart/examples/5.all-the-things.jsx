import React from 'react';
import LineChart from '../LineChart';

const data = [
	{ date: new Date('2015-01-01T00:00:00-08:00'), apples: 2000, oranges: 3000 },
	{ date: new Date('2015-01-02T00:00:00-08:00'), apples: 2000, oranges: 5000 },
	{ date: new Date('2015-01-03T00:00:00-08:00'), apples: 3000, oranges: 2000 },
	{ date: new Date('2015-01-04T00:00:00-08:00'), apples: 5000, oranges: 6000 },
];
const yFormatter = (d) => `${d / 1000}k`;
const xFormatter = (d) => `${d.getMonth() + 1}-${d.getDate()}`;

export default React.createClass({
	render() {
		return (
			<LineChart
				data={data}
				legend={{
					date: 'Dates',
					apples: 'Number of Apples',
					oranges: 'Number of Oranges',
				}}

				xAxisField='date'
				xAxisFormatter={xFormatter}
				xAxisMin={new Date('2014-12-31:00:00-08:00')}
				xAxisMax={new Date('2015-01-05:00:00-08:00')}
				xAxisTickCount={5}
				xAxisHasTitle={true}

				yAxisFields={['apples']}
				yAxisFormatter={yFormatter}
				yAxisHasTitle={true}
				yAxisTickCount={5}

				y2AxisFields={['oranges']}
				y2AxisFormatter={yFormatter}
				y2AxisHasTitle={true}
				y2AxisTickCount={5}
				y2AxisHasPoints={false}
			/>
		);
	}
});
