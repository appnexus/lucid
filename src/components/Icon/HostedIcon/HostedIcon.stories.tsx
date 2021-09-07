import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { HostedIcon } from './HostedIcon';

export default {
	title: 'Icons/Icons/HostedIcon',
	component: HostedIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <HostedIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
