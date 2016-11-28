import React from 'react';
import { MinusIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<MinusIcon isDisabled />
				<MinusIcon isDisabled isBadge />
			</div>
		);
	},
});
