import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { CloseIcon } from './CloseIcon';

export default {
	title: 'Icons/Icons/CloseIcon',
	component: CloseIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <CloseIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
