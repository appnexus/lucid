import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { BackUpArrowIcon } from './BackUpArrowIcon';

export default {
	title: 'Icons/Icons/BackUpArrowIcon',
	component: BackUpArrowIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <BackUpArrowIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
