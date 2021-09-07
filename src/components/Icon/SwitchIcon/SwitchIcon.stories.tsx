import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { SwitchIcon } from './SwitchIcon';

export default {
	title: 'Icons/Icons/SwitchIcon',
	component: SwitchIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <SwitchIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
