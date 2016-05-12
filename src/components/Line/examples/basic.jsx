import React from 'react';
import Line from '../Line';

export default React.createClass({
	render() {
		return (
			<div>
				<svg width={200} height={100}>
					<Line color={0} d='M0,0 L100,100' />
					<Line color={1} d='M0,20 L100,80' />
					<Line color={2} d='M0,40 L100,60' />
					<Line color={3} d='M0,60 L100,40' />
					<Line color={4} d='M0,80 L100,20' />
					<Line color={5} d='M0,100 L100,0' />
				</svg>
			</div>
		);
	}
});
