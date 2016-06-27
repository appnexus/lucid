import React from 'react';
import Line from '../Line';
import * as chartConstants from '../../../constants/charts';

export default React.createClass({
	render() {
		return (
			<div>
				<svg width={200} height={100}>
					<Line color={chartConstants.COLOR_0} d='M0,0 L100,100' />
					<Line color={chartConstants.COLOR_1} d='M0,20 L100,80' />
					<Line color={chartConstants.COLOR_2} d='M0,40 L100,60' />
					<Line color={chartConstants.COLOR_3} d='M0,60 L100,40' />
					<Line color={chartConstants.COLOR_4} d='M0,80 L100,20' />
					<Line color={chartConstants.COLOR_5} d='M0,100 L100,0' />
				</svg>
			</div>
		);
	},
});
