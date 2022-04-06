import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
	GripperHorizontalIcon,
	IGripperHorizontalIconProps,
} from './GripperHorizontalIcon';

export default {
	title: 'Icons/Icons/GripperHorizontalIcon',
	component: GripperHorizontalIcon,
	parameters: {
		docs: {
			description: {
				component: GripperHorizontalIcon.peek.description,
			},
		},
	},
	args: GripperHorizontalIcon.defaultProps,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IGripperHorizontalIconProps> = (args) => (
	<GripperHorizontalIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
