import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ResizeIcon } from './ResizeIcon';

export default {
	title: 'Icons/Icons/ResizeIcon',
	component: ResizeIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ResizeIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
