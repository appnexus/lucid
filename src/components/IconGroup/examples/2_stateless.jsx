import React from 'react';
import createClass from 'create-react-class';
import { IconGroupDumb as IconGroup, ClockIcon } from '../../../index';

export default createClass({
	render() {
		return (
			<IconGroup className="Custom-Class" selectedIndices={[[7], [6, 8]]}>
				<IconGroup.Box isSelected={true}>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Zero
				</IconGroup.Box>
				<IconGroup.Box className={'my-custom-iconbox-class'}>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					One
				</IconGroup.Box>
				<IconGroup.Box>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Two
				</IconGroup.Box>
				<IconGroup.Box>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Three
				</IconGroup.Box>
				<IconGroup.Box>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Four
				</IconGroup.Box>
				<IconGroup.Box isIndeterminate={true}>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Five
				</IconGroup.Box>
				<IconGroup.Box isDisabled={true}>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Six
				</IconGroup.Box>
				<IconGroup.Box>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Seven
				</IconGroup.Box>
				<IconGroup.Box>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Eight
				</IconGroup.Box>
				<IconGroup.Box>
					<IconGroup.Icon><ClockIcon /></IconGroup.Icon>
					Nine
				</IconGroup.Box>
			</IconGroup>
		);
	},
});
