import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { HelpIcon } from './HelpIcon';

export default {
	title: 'Icons/Icons/HelpIcon',
	component: HelpIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <HelpIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
