import React from 'react';
import createClass from 'create-react-class';
import BarChart from '../BarChart';

const data = [
	{ x: '2015-01-01', y: 1 },
	{ x: '2015-01-02', y: 2 },
	{ x: '2015-01-03', y: 3 },
	{ x: '2015-01-04', y: 5 },
	{ x: '2015-01-05', y: 2 },
	{ x: '2015-01-06', y: 3 },
	{ x: '2015-01-07', y: 2 },
	{ x: '2015-01-08', y: 2 },
	{ x: '2015-01-09', y: 5 },
	{ x: '2015-01-10', y: 3 },
	{ x: '2015-01-11', y: 4 },
	{ x: '2015-01-12', y: 4 },
	{ x: '2015-01-13', y: 5 },
	{ x: '2015-01-14', y: 3 },
	{ x: '2015-01-15', y: 4 },
	{ x: '2015-01-16', y: 3 },
	{ x: '2015-01-17', y: 6 },
];

export default createClass({
	render() {
		return (
			<div>
				<BarChart
					data={data}
					yAxisMin={0}
					xAxisTickCount={5}
					yAxisTickCount={4}
				/>
			</div>
		);
	},
});
