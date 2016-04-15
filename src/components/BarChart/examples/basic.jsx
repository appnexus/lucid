import React from 'react';

import BarChart from '../BarChart';

const data = [
	{ seconds: 0, temperature: 20 },
	{ seconds: 1, temperature: 27 },
	{ seconds: 2, temperature: 36 },
	{ seconds: 3, temperature: 52 },
	{ seconds: 4, temperature: 69 },
	{ seconds: 5, temperature: 79 },
	{ seconds: 6, temperature: 85 },
	{ seconds: 7, temperature: 91 },
	{ seconds: 8, temperature: 97 },
	{ seconds: 9, temperature: 102 },
	{ seconds: 10, temperature: 107 },
	{ seconds: 11, temperature: 111 },
	{ seconds: 12, temperature: 114 },
	{ seconds: 13, temperature: 116 },
	{ seconds: 14, temperature: 117 },
	{ seconds: 15, temperature: 117 },
	{ seconds: 16, temperature: 118 }
];

export default React.createClass({
	render() {
		return (
			<BarChart
				data={data}
				xAxisDataKey='seconds'
				xAxisLabel='Time elapsed (seconds)'
				yAxisDataKey='temperature'
				yAxisLabel='Temperature (°F)'
			/>
		);
	}
});
