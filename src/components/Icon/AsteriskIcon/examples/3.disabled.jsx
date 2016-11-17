import React from 'react';
import { AsteriskIcon } from '../../../../index';

export default React.createClass({
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
