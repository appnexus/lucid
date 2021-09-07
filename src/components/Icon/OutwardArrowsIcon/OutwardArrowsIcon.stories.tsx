import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
	OutwardArrowsIcon,
	IOutwardArrowsIconProps,
} from './OutwardArrowsIcon';

export default {
	title: 'Icons/Icons/OutwardArrowsIcon',
	component: OutwardArrowsIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IOutwardArrowsIconProps> = (args) => (
	<OutwardArrowsIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
