/* eslint-disable comma-spacing */

import React from 'react';
import createClass from 'create-react-class';
import { PieChart, chartConstants } from '../../../index';

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
			<div>
				<PieChart data={data} isDonut />
				<PieChart
					data={data}
					palette={chartConstants.PALETTE_MONOCHROME_0_5}
					isDonut
				/>
				<PieChart
					data={data}
					palette={chartConstants.PALETTE_MONOCHROME_1_5}
					isDonut
				/>
				<PieChart
					data={data}
					palette={chartConstants.PALETTE_MONOCHROME_2_5}
					isDonut
				/>
				<PieChart
					data={data}
					palette={chartConstants.PALETTE_MONOCHROME_3_5}
					isDonut
				/>
				<PieChart
					data={data}
					palette={chartConstants.PALETTE_MONOCHROME_4_5}
					isDonut
				/>
				<PieChart
					data={data}
					palette={chartConstants.PALETTE_MONOCHROME_5_5}
					isDonut
				/>
			</div>
		);
	},
});
