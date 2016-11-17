import React from 'react';
import { EditIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<EditIcon isClickable />
				<EditIcon isClickable isBadge />
			</div>
		);
	},
});
