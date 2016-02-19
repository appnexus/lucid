import React from 'react';
import PlusIcon from '../PlusIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<PlusIcon />
				<PlusIcon isBadge />
			</div>
		);
	}
});
