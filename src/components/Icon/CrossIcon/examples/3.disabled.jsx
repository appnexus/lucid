import React from 'react';
import createClass from 'create-react-class';
import { CrossIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<p>Small (default):</p>
				<CrossIcon isDisabled />
				<CrossIcon isDisabled isBadge />
				<p>Large:</p>
				<CrossIcon presetSize="large" isDisabled />
			</div>
		);
	},
});
