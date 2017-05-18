import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { LineChart, Legend, chartConstants } from '../../../index';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), apples: 2, oranges: 3, pears: 1 },
	{ x: new Date('2015-01-02T00:00:00-08:00'), apples: 2, oranges: 5, pears: 6 },
	{ x: new Date('2015-01-03T00:00:00-08:00'), apples: 3, oranges: 2, pears: 4 },
	{ x: new Date('2015-01-04T00:00:00-08:00'), apples: 5, oranges: 6, pears: 1 },
];
const yAxisFields = ['apples', 'oranges', 'pears'];
const palette = chartConstants.PALETTE_MONOCHROME_2_5;

export default createClass({
	render() {
		return (
			<div>
				<LineChart
					data={data}
					yAxisFields={yAxisFields}
					yAxisTitle="Fruit Count"
					palette={palette}
				/>

				<Legend style={{ verticalAlign: 'top' }}>
					{_.map(yAxisFields, (field, i) => (
						<Legend.Item
							key={field}
							hasPoint
							hasLine
							color={palette[i % palette.length]}
							pointKind={i}
						>
							{field}
						</Legend.Item>
					))}
				</Legend>
			</div>
		);
	},
});
