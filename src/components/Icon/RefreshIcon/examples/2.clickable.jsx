import React from 'react';
import createClass from 'create-react-class';
import { RefreshIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<RefreshIcon isClickable />
				<RefreshIcon isClickable isBadge />
			</div>
		);
	},
});
