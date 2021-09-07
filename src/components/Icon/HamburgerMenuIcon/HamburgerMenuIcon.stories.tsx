import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { HamburgerMenuIcon } from './HamburgerMenuIcon';

export default {
	title: 'Icons/Icons/HamburgerMenuIcon',
	component: HamburgerMenuIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <HamburgerMenuIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
