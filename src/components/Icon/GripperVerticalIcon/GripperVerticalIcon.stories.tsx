import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
	GripperVerticalIcon,
	IGripperVerticalIconProps,
} from '../GripperVerticalIcon/GripperVerticalIcon';

export default {
	title: 'Icons/Icons/GripperVerticalIcon',
	component: GripperVerticalIcon,
	parameters: {
		docs: {
			description: {
				component: GripperVerticalIcon.peek.description,
			},
		},
	},
	args: GripperVerticalIcon.defaultProps,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IGripperVerticalIconProps> = (args) => (
	<GripperVerticalIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
