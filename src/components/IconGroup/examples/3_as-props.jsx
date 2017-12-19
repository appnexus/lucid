import React from 'react';
import createClass from 'create-react-class';
import { IconGroup, ClockIcon } from '../../../index';

export default createClass({
	render() {
		return (
			<IconGroup
				Boxes={[
					{
						Icon: <ClockIcon />,
						children: 'Zero',
						hasIndeterminate: true,
					},
					{
						Icon: <ClockIcon />,
						children: 'One',
					},
					{
						Icon: <ClockIcon />,
						children: 'Two',
					},
					{
						Icon: <ClockIcon />,
						children: 'Three',
					},
				]}
			/>
		);
	},
});
