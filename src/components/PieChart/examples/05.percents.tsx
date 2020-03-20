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

const style = {
	paddingTop: '4rem',
};

export default createClass({
	render() {
		return (
			<div style={style}>
				<PieChart
					data={data}
					yAxisFormatter={(value: number) => {
						return `${((value / total) * 100).toFixed(1)}%`;
					}}
				/>
			</div>
		);
	},
});
