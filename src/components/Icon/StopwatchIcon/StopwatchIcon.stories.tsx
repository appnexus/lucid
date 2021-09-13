import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { StopwatchIcon } from './StopwatchIcon';

export default {
	title: 'Icons/Icons/StopwatchIcon',
	component: StopwatchIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <StopwatchIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
