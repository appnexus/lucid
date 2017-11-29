import React from 'react';
import createClass from 'create-react-class';
import { FolderIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<FolderIcon isClickable />
				<FolderIcon isClickable isBadge />
			</div>
		);
	},
});
