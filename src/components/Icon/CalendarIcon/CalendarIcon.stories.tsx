import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { CalendarIcon } from './CalendarIcon';

export default {
	title: 'Icons/Icons/CalendarIcon',
	component: CalendarIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <CalendarIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
