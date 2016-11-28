import React from 'react';
import { SearchIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<SearchIcon isClickable />
				<SearchIcon isClickable isBadge />
			</div>
		);
	},
});
