import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { CheckIcon } from './CheckIcon';

export default {
	title: 'Icons/Icons/CheckIcon',
	component: CheckIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <CheckIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
