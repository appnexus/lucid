import React from 'react';
import createClass from 'create-react-class';
import { DraggableLineChart } from '../../../index';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), y: 1 },
	{ x: new Date('2015-01-02T00:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-03T00:00:00-08:00'), y: 3 },
	{ x: new Date('2015-01-04T00:00:00-08:00'), y: 5 },
];

const style = {
	paddingTop: '4rem',
};

export default createClass({
	render() {
		return (
			<div style={style}>
				<DraggableLineChart data={data} />
			</div>
		);
	},
});
