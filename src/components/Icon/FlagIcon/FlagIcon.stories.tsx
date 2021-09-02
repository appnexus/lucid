import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { FlagIcon } from './FlagIcon';

export default {
	title: 'Icons/Icons/FlagIcon',
	component: FlagIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <FlagIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
