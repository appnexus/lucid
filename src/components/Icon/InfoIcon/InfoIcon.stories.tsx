import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { InfoIcon } from './InfoIcon';

export default {
	title: 'Icons/Icons/InfoIcon',
	component: InfoIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <InfoIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
