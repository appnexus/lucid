import React from 'react';
import createClass from 'create-react-class';
import { BarChart } from '../../../index';

const data = [
	{ x: '2015-01-01', y: 1 },
	{ x: '2015-01-02', y: 2 },
	{ x: '2015-01-03', y: 3 },
	{ x: '2015-01-04', y: 5 },
];

export default createClass({
	render() {
		return (
			<div>
				<BarChart data={data} yAxisTitle="Revenue" />
			</div>
		);
	},
});
