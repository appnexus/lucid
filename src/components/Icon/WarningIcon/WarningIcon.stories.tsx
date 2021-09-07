import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { WarningIcon } from './WarningIcon';

export default {
	title: 'Icons/Icons/WarningIcon',
	component: WarningIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <WarningIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
