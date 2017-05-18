import React from 'react';
import createClass from 'create-react-class';
import { EditIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<EditIcon />
				<EditIcon isBadge />
			</div>
		);
	},
});
