import React from 'react';
import createClass from 'create-react-class';
import { IconGroup, ClockIcon } from '../../../index';

export default createClass({
	render() {
		return (
			<IconGroup>
				<IconGroup.Box hasIndeterminate>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Zero
				</IconGroup.Box>
				<IconGroup.Box onClick={() => console.log('IconBox 2 Clicked!')}>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					One
				</IconGroup.Box>
				<IconGroup.Box>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Two
				</IconGroup.Box>
			</IconGroup>
		);
	},
});
