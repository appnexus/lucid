import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { SettingsIcon } from './SettingsIcon';

export default {
	title: 'Icons/Icons/SettingsIcon',
	component: SettingsIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <SettingsIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
