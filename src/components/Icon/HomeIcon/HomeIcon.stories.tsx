import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { HomeIcon } from './HomeIcon';

export default {
	title: 'Icons/Icons/HomeIcon',
	component: HomeIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <HomeIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
