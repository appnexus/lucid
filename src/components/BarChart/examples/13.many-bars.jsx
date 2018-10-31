import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import BarChart from '../BarChart';

const data = _.map(_.range(0, 200), n => ({
	x: new Date(0) + n * 60 * 60 * 24,
	y: n,
}));

export default createClass({
	render() {
		return (
			<BarChart
				data={data}
				xAxisTextOrientation="diagonal"
				yAxisTextOrientation="horizontal"
				xAxisTickCount={20}
				height={600}
				width={1400}
				margin={{ bottom: 300, left: 300 }}
			/>
		);
	},
});
