import React from 'react';
import createReactClass from 'create-react-class';
import { SearchIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<SearchIcon isDisabled />
				<SearchIcon isDisabled isBadge />
			</div>
		);
	},
});
