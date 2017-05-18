import React from 'react';
import createClass from 'create-react-class';
import { AsteriskIcon } from '../../../../index';

export default createClass({
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
