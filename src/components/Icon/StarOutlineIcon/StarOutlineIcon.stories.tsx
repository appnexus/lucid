import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { StarOutlineIcon } from './StarOutlineIcon';

export default {
	title: 'Icons/Icons/StarOutlineIcon',
	component: StarOutlineIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <StarOutlineIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
