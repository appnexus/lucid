import React from 'react';
import WarningIcon from '../WarningIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<WarningIcon />
				<WarningIcon isBadge />
			</div>
		);
	}
});
