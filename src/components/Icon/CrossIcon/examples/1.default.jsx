import React from 'react';
import createClass from 'create-react-class';
import { CrossIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<p>Small (default):</p>
				<CrossIcon />
				<CrossIcon isBadge />
				<p>Large:</p>
				<CrossIcon large />
				<CrossIcon large isBadge />
			</div>
		);
	},
});
