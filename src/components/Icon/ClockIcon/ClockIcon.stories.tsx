import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ClockIcon } from './ClockIcon';

export default {
	title: 'Icons/Icons/ClockIcon',
	component: ClockIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ClockIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
