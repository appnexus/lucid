import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { SuccessIcon } from './SuccessIcon';

export default {
	title: 'Icons/Icons/SuccessIcon',
	component: SuccessIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <SuccessIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
