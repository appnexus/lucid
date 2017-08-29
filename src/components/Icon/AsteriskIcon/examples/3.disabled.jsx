import React from 'react';
import createReactClass from 'create-react-class';
import { AsteriskIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<div>
					<AsteriskIcon isDisabled />
				</div>
				<div>
					<AsteriskIcon isDisabled isBadge />
				</div>
			</div>
		);
	},
});
