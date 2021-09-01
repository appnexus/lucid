import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { DotsIcon, IDotsIconProps } from './DotsIcon';

export default {
	title: 'Icons/Icons/DotsIcon',
	component: DotsIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IDotsIconProps> = (args) => <DotsIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
