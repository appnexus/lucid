import React from 'react';
import createClass from 'create-react-class';
import { CrossIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<CrossIcon isClickable />
				<CrossIcon isClickable isBadge />
			</div>
		);
	},
});
