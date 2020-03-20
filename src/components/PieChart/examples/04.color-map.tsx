/* eslint-disable comma-spacing */

import React from 'react';
import createClass from 'create-react-class';
import { PieChart, chartConstants } from '../../../index';

const data = [
	{ x: 'Leslie', y: 100 },
	{ x: 'Tom', y: 20 },
	{ x: 'Ron', y: 10 },
	{ x: 'Ann', y: 30 },
	{ x: 'Tammy', y: 40 },
];

const style = {
	paddingTop: '4rem',
};

export default createClass({
	render() {
		return (
			<div style={style}>
				<PieChart
					data={data}
					colorMap={{
						Tammy: chartConstants.COLOR_BAD,
						Leslie: chartConstants.COLOR_GOOD,
					}}
				/>
			</div>
		);
	},
});
