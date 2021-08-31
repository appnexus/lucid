import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { AddURLIcon } from './AddURLIcon';

export default {
	title: 'Icons/Icons/AddURLIcon',
	component: AddURLIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <AddURLIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
