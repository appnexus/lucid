import React from 'react';
import { RefreshIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<RefreshIcon />
				<RefreshIcon isBadge />
			</div>
		);
	},
});
