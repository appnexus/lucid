import React from 'react';
import BarChart from '../BarChart';

const data = [
	{ day: 'monday'    , apples: 2000 , oranges: 3000 } ,
	{ day: 'tuesday'   , apples: 2000 , oranges: 5000 } ,
	{ day: 'wednesday' , apples: 3000 , oranges: 2000 } ,
	{ day: 'thursday'  , apples: 5000 , oranges: 6000 } ,
];
const yFormatter = (d) => `${d / 1000}k`;
const xFormatter = (d) => d.toUpperCase().slice(0, 3);

export default React.createClass({
	render() {
		return (
			<BarChart
				data={data}
				margin={{
					bottom: 100,
				}}
				hasLegend={true}
				legend={{
					day: 'Day of Week',
					apples: 'Number of Apples',
					oranges: 'Number of Oranges',
				}}

				xAxisField='day'
				xAxisFormatter={xFormatter}
				xAxisTickCount={5}
				xAxisTitle='Weekdays'
				xAxisTickCount={2}

				yAxisFields={['apples', 'oranges']}
				yAxisFormatter={yFormatter}
				yAxisTitle='Fruit Count'
				yAxisTickCount={4}
			/>
		);
	},
});
