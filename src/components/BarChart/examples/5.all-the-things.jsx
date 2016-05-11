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
			<div>
				<BarChart
					data={data}
					margin={{
						top: 5,
						right: 80,
						bottom: 60,
						left: 80,
					}}
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

				<BarChart
					height={500}
					width={1000}
					margins={{
						top: 50,
						right: 50,
						bottom: 50,
						left: 50,
					}}
					data={[
						{date: '2015-01-01', rev: 100, imps: 1000},
						{date: '2015-01-02', rev: 89, imps: 2200},
						{date: '2015-01-03', rev: 95, imps: 3305},
					]}

					xAxisField='date'
					xAxisTitle='Date'
					xAxisTickCount={8}
					xAxisFormatter={() => 'x axis tick'}

					yAxisFields={['rev', 'imps']}
					yAxisTitle='Metrics'
					yAxisTickCount={4}
					yAxisFormatter={() => 'y axis tick'}
				/>
			</div>
		);
	}
});
