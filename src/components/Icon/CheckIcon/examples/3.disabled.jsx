import React from 'react';
import { CheckIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<CheckIcon isDisabled />
				<CheckIcon isDisabled isBadge />
			</div>
		);
	},
});
