import React from 'react';
import LineChart from '../LineChart';

import * as formatters from '../../../constants/formatters';

const data = [
	{ x: new Date('2015-01-07T00:00:00-08:00'), blueberries: 1030872156 },
	{ x: new Date('2015-01-08T00:00:00-08:00'), blueberries: 4002156 },
	{ x: new Date('2015-01-09T00:00:00-08:00'), blueberries: 214872156 },
	{ x: new Date('2015-01-10T00:00:00-08:00'), blueberries: 42872156 },
	{ x: new Date('2015-01-11T00:00:00-08:00'), blueberries: 4230872156 },
];

export default React.createClass({
	render() {
		return (
			<LineChart
				data={data}

				yAxisFields={['blueberries']}
				yAxisFormatter={formatters.formatAbbreviatedNumber}
				yAxisTooltipDataFormatter={formatters.formatNumberNoDecimal}
			/>
		);
	},
});
