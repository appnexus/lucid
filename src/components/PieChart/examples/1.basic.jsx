/* eslint-disable comma-spacing */

import React from 'react';
import createReactClass from 'create-react-class';
import { PieChart, chartConstants } from '../../../index';

const data = [
	{ x: 'Leslie', y: 60 },
	{ x: 'Ron', y: 40 },
	{ x: 'Tom', y: 30 },
	{ x: 'Gary', y: 20 },
	{ x: 'Ben', y: 15 },
];

export default createReactClass({
	render() {
		return (
			<div>
				<PieChart data={data} />
				<PieChart data={data} palette={chartConstants.PALETTE_MONOCHROME_0_5} />
				<PieChart data={data} palette={chartConstants.PALETTE_MONOCHROME_1_5} />
				<PieChart data={data} palette={chartConstants.PALETTE_MONOCHROME_2_5} />
				<PieChart data={data} palette={chartConstants.PALETTE_MONOCHROME_3_5} />
				<PieChart data={data} palette={chartConstants.PALETTE_MONOCHROME_4_5} />
				<PieChart data={data} palette={chartConstants.PALETTE_MONOCHROME_5_5} />
			</div>
		);
	},
});
