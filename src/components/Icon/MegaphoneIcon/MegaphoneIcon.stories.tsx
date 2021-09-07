import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { MegaphoneIcon } from './MegaphoneIcon';

export default {
	title: 'Icons/Icons/MegaphoneIcon',
	component: MegaphoneIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <MegaphoneIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
