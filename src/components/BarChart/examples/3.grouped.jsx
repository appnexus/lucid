import React from 'react';
import BarChart from '../BarChart';
import { chartConstants } from '../../../index';

const data = [
	{ x: 'Monday'    , apples: 10 , pears: 20 , peaches: 35 , bananas: 15 , oranges: 5  } ,
	{ x: 'Tuesday'   , apples: 20 , pears: 5  , peaches: 20 , bananas: 25 , oranges: 27 } ,
	{ x: 'Wednesday' , apples: 5  , pears: 15 , peaches: 5  , bananas: 20 , oranges: 35 } ,
];

export default React.createClass({
	render() {
		return (
			<div>
				<BarChart
					data={data}
					yAxisFields={['apples', 'pears', 'peaches', 'bananas', 'oranges']}
					yAxisMin={0}
					yAxisTitle='Fruit Count'
					palette={chartConstants.PALETTE_30}
				/>
			</div>
		);
	},
});
