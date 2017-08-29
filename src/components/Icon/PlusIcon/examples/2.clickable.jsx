import React from 'react';
import createReactClass from 'create-react-class';
import { PlusIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<PlusIcon isClickable />
				<PlusIcon isClickable isBadge />
			</div>
		);
	},
});
