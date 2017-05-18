import React from 'react';
import createClass from 'create-react-class';
import { LineChart, Resizer } from '../../../index';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), y: 1 },
	{ x: new Date('2015-01-02T00:00:00-08:00'), y: 2 },
	{ x: new Date('2015-01-03T00:00:00-08:00'), y: 3 },
	{ x: new Date('2015-01-04T00:00:00-08:00'), y: 5 },
];

export default createClass({
	render() {
		return (
			<Resizer>
				{(width /*, height */) => (
					<LineChart width={width} height={width * 0.3} data={data} />
				)}
			</Resizer>
		);
	},
});
