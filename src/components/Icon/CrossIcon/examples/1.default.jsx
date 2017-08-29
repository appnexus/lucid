import React from 'react';
import createReactClass from 'create-react-class';
import { CrossIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<CrossIcon />
				<CrossIcon isBadge />
			</div>
		);
	},
});
