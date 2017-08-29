import React from 'react';
import createReactClass from 'create-react-class';
import { AsteriskIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<div>
					<AsteriskIcon isClickable />
				</div>
				<div>
					<AsteriskIcon isClickable isBadge />
				</div>
			</div>
		);
	},
});
