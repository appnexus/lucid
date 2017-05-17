/* eslint-disable comma-spacing */

import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { PieChart } from '../../../index';

const data = [
	{ x: 'Leslie', y: 60 },
	{ x: 'Ron', y: 40 },
	{ x: 'Tom', y: 30 },
	{ x: 'Gary', y: 20 },
	{ x: 'Ben', y: 15 },
];

const total = _.sum(_.map(data, 'y'));

export default createClass({
	render() {
		return (
			<div>
				<PieChart
					data={data}
					yAxisFormatter={value => {
						return `${(value / total * 100).toFixed(1)}%`;
					}}
				/>
			</div>
		);
	},
});
