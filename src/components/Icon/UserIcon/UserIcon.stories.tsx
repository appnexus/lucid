import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { UserIcon } from './UserIcon';

export default {
	title: 'Icons/Icons/UserIcon',
	component: UserIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <UserIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
