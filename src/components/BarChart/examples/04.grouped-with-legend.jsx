/* eslint-disable comma-spacing */

import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { BarChart, Legend, chartConstants } from '../../../index';

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
const yAxisFields = ['apples', 'pears', 'peaches', 'bananas', 'oranges'];
const palette = chartConstants.PALETTE_6;

export default createClass({
	render() {
		return (
			<div>
				<BarChart
					data={data}
					yAxisFields={yAxisFields}
					yAxisMin={0}
					yAxisTitle="Fruit Count"
					palette={palette}
				/>

				<Legend style={{ verticalAlign: 'top' }}>
					{_.map(yAxisFields, (field, i) => (
						<Legend.Item
							key={field}
							hasPoint
							color={palette[i % palette.length]}
						>
							{field}
						</Legend.Item>
					))}
				</Legend>
			</div>
		);
	},
});
