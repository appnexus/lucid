import React from 'react';
import createClass from 'create-react-class';
import BarChart from '../BarChart';

const data = [
	{ x: '2015-01-01', y: 1200 },
	{ x: '2015-01-02', y: 900 },
	{ x: '2015-01-03', y: 1800 },
	{ x: '2015-01-04', y: 3000 },
];

export default createClass({
	render() {
		return (
			<div>
				<BarChart
					data={data}
					yAxisTitle="Revenue"
					yAxisTooltipFormatter={(yField, yValueFormatted, yValue) => yValue}
				/>
			</div>
		);
	},
});
