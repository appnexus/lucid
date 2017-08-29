/* eslint-disable comma-spacing */

import React from 'react';
import createReactClass from 'create-react-class';
import { BarChart, chartConstants } from '../../../index';

const data = [
	{ x: 'Monday', apples: 10, pears: 20, peaches: 35, bananas: 15, oranges: 5 },
	{ x: 'Tuesday', apples: 20, pears: 5, peaches: 20, bananas: 25, oranges: 27 },
	{
		x: 'Wednesday',
		apples: 5,
		pears: 15,
		peaches: 5,
		bananas: 20,
		oranges: 35,
	},
];

export default createReactClass({
	render() {
		return (
			<div>
				<BarChart
					data={data}
					yAxisFields={['apples', 'pears', 'peaches', 'bananas', 'oranges']}
					yAxisMin={0}
					yAxisTitle="Fruit Count"
					palette={chartConstants.PALETTE_30}
				/>
			</div>
		);
	},
});
