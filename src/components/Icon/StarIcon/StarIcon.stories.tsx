import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { StarIcon } from './StarIcon';

export default {
	title: 'Icons/Icons/StarIcon',
	component: StarIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <StarIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
