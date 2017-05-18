import React from 'react';
import createClass from 'create-react-class';
import { MinusIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<MinusIcon isClickable />
				<MinusIcon isClickable isBadge />
			</div>
		);
	},
});
