import React from 'react';
import createClass from 'create-react-class';
import { PlusIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<PlusIcon isClickable />
				<PlusIcon isClickable isBadge />
			</div>
		);
	},
});
