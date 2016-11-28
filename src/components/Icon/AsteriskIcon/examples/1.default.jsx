import React from 'react';
import { AsteriskIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<AsteriskIcon />
				</div>
				<div>
					<AsteriskIcon isBadge />
				</div>
			</div>
		);
	},
});
