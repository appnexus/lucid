import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ChatIcon } from './ChatIcon';

export default {
	title: 'Icons/Icons/ChatIcon',
	component: ChatIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ChatIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
