import React from 'react';
import { PlusIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<PlusIcon isDisabled />
				<PlusIcon isDisabled isBadge />
			</div>
		);
	},
});
