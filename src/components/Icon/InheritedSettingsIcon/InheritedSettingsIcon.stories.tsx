import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { InheritedSettingsIcon } from './InheritedSettingsIcon';

export default {
	title: 'Icons/Icons/InheritedSettingsIcon',
	component: InheritedSettingsIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => (
	<InheritedSettingsIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
