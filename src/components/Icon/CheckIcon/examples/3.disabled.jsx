import React from 'react';
import createClass from 'create-react-class';
import { CheckIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<CheckIcon isDisabled />
				<CheckIcon isDisabled isBadge />
			</div>
		);
	},
});
