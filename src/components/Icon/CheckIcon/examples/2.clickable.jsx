import React from 'react';
import { CheckIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<CheckIcon isClickable />
				<CheckIcon isClickable isBadge />
			</div>
		);
	},
});
