import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BellIcon, IBellIconProps } from './BellIcon';

export default {
	title: 'Icons/Icons/BellIcon',
	component: BellIcon,
	parameters: {
		docs: {
			description: {
				component: BellIcon.peek.description,
			},
		},
	},
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IBellIconProps> = (args) => <BellIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
