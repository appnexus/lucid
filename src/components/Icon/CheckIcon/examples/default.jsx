import React from 'react';
import CheckIcon from '../CheckIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<CheckIcon />
				<CheckIcon isBadge />
			</div>
		);
	}
});
