import React from 'react';
import { StopwatchIcon, Tag } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<StopwatchIcon isBadge />
				</div>
				<Tag>Stopwatch <StopwatchIcon isBadge /></Tag>
			</div>
		);
	},
});
