import React from 'react';
import createReactClass from 'create-react-class';
import { RefreshIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<RefreshIcon isClickable />
				<RefreshIcon isClickable isBadge />
			</div>
		);
	},
});
