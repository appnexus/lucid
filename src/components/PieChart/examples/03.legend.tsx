import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { PieChart, Legend, chartConstants } from '../../../index';

const data = [
	{ x: 'Leslie', y: 80 },
	{ x: 'Tom', y: 20 },
	{ x: 'Ron', y: 10 },
	{ x: 'Ann', y: 30 },
];

const palette = chartConstants.PALETTE_7;

const style = {
	display: 'flex',
	alignItems: 'center',
	paddingTop: '4rem',
};

export default createClass({
	render() {
		return (
			<div style={style}>
				<PieChart data={data} palette={palette} />
				<Legend>
					{_.map(data, (d, index) => (
						<Legend.Item
							key={index}
							color={palette[index % palette.length]}
							hasPoint
							pointKind={1}
						>
							{d.x}
						</Legend.Item>
					))}
				</Legend>
			</div>
		);
	},
});
