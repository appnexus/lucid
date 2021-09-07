import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { LinkedIcon } from './LinkedIcon';

export default {
	title: 'Icons/Icons/LinkedIcon',
	component: LinkedIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <LinkedIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
