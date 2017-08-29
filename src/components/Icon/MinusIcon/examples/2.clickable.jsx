import React from 'react';
import createReactClass from 'create-react-class';
import { MinusIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<MinusIcon isClickable />
				<MinusIcon isClickable isBadge />
			</div>
		);
	},
});
