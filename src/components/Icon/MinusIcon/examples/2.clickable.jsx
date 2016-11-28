import React from 'react';
import { MinusIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<MinusIcon isClickable />
				<MinusIcon isClickable isBadge />
			</div>
		);
	},
});
