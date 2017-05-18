import React from 'react';
import createClass from 'create-react-class';
import { AsteriskIcon } from '../../../../index';

export default createClass({
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
