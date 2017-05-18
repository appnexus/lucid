import React from 'react';
import createClass from 'create-react-class';
import { SearchIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<SearchIcon />
				<SearchIcon isBadge />
			</div>
		);
	},
});
