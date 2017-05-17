/* eslint-disable comma-spacing */

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

export default createClass({
	render() {
		return (
			<PieChart
				margin={{
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				}}
				width={25}
				height={25}
				data={data}
				hasStroke={false}
				isHovering={false}
			/>
		);
	},
});
