import React from 'react';
import { CrossIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<CrossIcon isClickable />
				<CrossIcon isClickable isBadge />
			</div>
		);
	},
});
