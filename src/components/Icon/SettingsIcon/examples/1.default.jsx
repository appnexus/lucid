import React from 'react';
import createClass from 'create-react-class';
import { SettingsIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				Small: <SettingsIcon />
				<br />
				Large: <SettingsIcon presetSize='large' />
			</div>
		);
	},
});
