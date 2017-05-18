import React from 'react';
import createClass from 'create-react-class';
import { CrossIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<CrossIcon />
				<CrossIcon isBadge />
			</div>
		);
	},
});
