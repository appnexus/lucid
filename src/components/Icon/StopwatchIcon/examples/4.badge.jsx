import React from 'react';
import createClass from 'create-react-class';
import { StopwatchIcon, Tag } from '../../../../index';

export default createClass({
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
