import React from 'react';
import createReactClass from 'create-react-class';
import { StopwatchIcon, Tag } from '../../../../index';

export default createReactClass({
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
