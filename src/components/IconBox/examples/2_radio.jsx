import React from 'react';
import createClass from 'create-react-class';
import { IconBox, ClockIcon } from '../../../index';

export default createClass({
	render() {
		return (
			<IconBox kind="radio">
				<IconBox.Icon><ClockIcon /></IconBox.Icon>
				Checkbox IconBox
			</IconBox>
		);
	},
});
