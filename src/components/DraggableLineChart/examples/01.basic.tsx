import React from 'react';
import createClass from 'create-react-class';

import { DraggableLineChart } from '../../../index';

const data = [
	{ x: '12 AM', y: 0 },
	{ x: '1 AM', y: 0 },
	{ x: '2 AM', y: 0 },
	{ x: '3 AM', y: 0 },
	{ x: '4 AM', y: 0 },
	{ x: '5 AM', y: 5 },
	{ x: '6 AM', y: 5 },
	{ x: '7 AM', y: 10 },
	{ x: '8 AM', y: 5 },
	{ x: '9 AM', y: 5 },
	{ x: '10 AM', y: 5 },
	{ x: '11 AM', y: 5 },
];

const style = {
	paddingTop: '4rem',
};

export default createClass({
	render() {
		return (
			<div style={style}>
				<DraggableLineChart
					onDragEnd={(x, y) => console.warn({ x, y })}
					data={data}
					width={900}
					xAxisTicksVertical={true}
				/>
			</div>
		);
	},
});
