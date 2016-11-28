import React from 'react';
import { AsteriskIcon } from '../../../../index';

export default React.createClass({
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
