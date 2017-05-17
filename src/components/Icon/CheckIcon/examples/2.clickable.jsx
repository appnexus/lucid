import React from 'react';
import createClass from 'create-react-class';
import { CheckIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<CheckIcon isClickable />
				<CheckIcon isClickable isBadge />
			</div>
		);
	},
});
