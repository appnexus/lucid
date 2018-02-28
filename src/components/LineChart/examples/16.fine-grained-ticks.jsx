import React from 'react';
import createClass from 'create-react-class';
import { LineChart } from '../../../index';
import _ from 'lodash';

const data = [
	{ x: new Date('2018-01-01T00:00:00-0800'), y: 1 },
	{ x: new Date('2018-01-02T00:00:00-0800'), y: 2 },
	{ x: new Date('2018-01-03T00:00:00-0800'), y: 3 },
];

export default createClass({
	render() {
		return (
			<LineChart
				data={data}
				xAxisTicks={_.map(data, 'x')}
				xAxisFormatter={date => date.toLocaleDateString()}
			/>
		);
	},
});
