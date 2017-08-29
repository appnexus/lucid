import React from 'react';
import createReactClass from 'create-react-class';
import { CheckIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<CheckIcon isClickable />
				<CheckIcon isClickable isBadge />
			</div>
		);
	},
});
