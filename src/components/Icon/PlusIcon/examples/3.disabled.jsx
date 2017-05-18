import React from 'react';
import createClass from 'create-react-class';
import { PlusIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<PlusIcon isDisabled />
				<PlusIcon isDisabled isBadge />
			</div>
		);
	},
});
