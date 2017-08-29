import React from 'react';
import createReactClass from 'create-react-class';
import { CrossIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<CrossIcon isClickable />
				<CrossIcon isClickable isBadge />
			</div>
		);
	},
});
