import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import BarChart from '../BarChart';

const data = _.map(_.range(0, 70), (n) => ({
	x: (new Date(0) as any) + n * 60 * 60 * 24,
	y: n,
}));

const style = {
	paddingTop: '5rem',
};

export default createClass({
	render() {
		return (
			<div style={style}>
				<BarChart
					data={data}
					xAxisTextOrientation='diagonal'
					yAxisTextOrientation='horizontal'
					xAxisTickCount={20}
					height={600}
					width={750}
					margin={{ bottom: 300, left: 300 } as any}
				/>
			</div>
		);
	},
});
