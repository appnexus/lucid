import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { HideIcon } from './HideIcon';

export default {
	title: 'Icons/Icons/HideIcon',
	component: HideIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <HideIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
