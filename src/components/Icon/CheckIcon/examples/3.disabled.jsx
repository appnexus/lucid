import React from 'react';
import createReactClass from 'create-react-class';
import { CheckIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<CheckIcon isDisabled />
				<CheckIcon isDisabled isBadge />
			</div>
		);
	},
});
