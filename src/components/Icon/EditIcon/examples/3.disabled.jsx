import React from 'react';
import { EditIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<EditIcon isDisabled />
				<EditIcon isDisabled isBadge />
			</div>
		);
	},
});
