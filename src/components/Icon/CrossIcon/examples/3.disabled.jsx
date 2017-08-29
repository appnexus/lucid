import React from 'react';
import createReactClass from 'create-react-class';
import { CrossIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<CrossIcon isDisabled />
				<CrossIcon isDisabled isBadge />
			</div>
		);
	},
});
