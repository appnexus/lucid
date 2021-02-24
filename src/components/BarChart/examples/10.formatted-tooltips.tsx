import React from 'react';
import createClass from 'create-react-class';
import { BarChart } from '../../../index';

const data = [
	{ x: '2015-01-01', y: 1200 },
	{ x: '2015-01-02', y: 900 },
	{ x: '2015-01-03', y: 1800 },
	{ x: '2015-01-04', y: 3000 },
];

const style = {
	paddingTop: '4rem',
};

export default createClass({
	render() {
		return (
			<div style={style}>
				<BarChart
					width={750}
					data={data}
					yAxisTitle='Revenue'
					renderTooltipBody={(dataPoint: any) =>
						`x value = ${dataPoint.x} and y value = ${dataPoint.y}`
					}
				/>
			</div>
		);
	},
});
