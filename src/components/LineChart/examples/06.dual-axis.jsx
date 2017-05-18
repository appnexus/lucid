import React from 'react';
import createClass from 'create-react-class';
import { LineChart, chartConstants } from '../../../index';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), bananas: 2, cherries: 8 },
	{ x: new Date('2015-03-02T00:00:00-08:00'), bananas: 2, cherries: 5 },
	{ x: new Date('2015-05-03T00:00:00-08:00'), bananas: 3, cherries: 5 },
	{ x: new Date('2015-07-04T00:00:00-08:00'), bananas: 5, cherries: 6 },
];

export default createClass({
	render() {
		return (
			<LineChart
				data={data}
				margin={{
					right: 80,
				}}
				colorMap={{
					bananas: chartConstants.COLOR_4,
					cherries: chartConstants.COLOR_2,
				}}
				yAxisFields={['bananas']}
				yAxisTitle="Number of Bananas"
				yAxisTitleColor={chartConstants.COLOR_4}
				y2AxisFields={['cherries']}
				y2AxisTitle="Number of Cherries"
				y2AxisTitleColor={chartConstants.COLOR_2}
			/>
		);
	},
});
