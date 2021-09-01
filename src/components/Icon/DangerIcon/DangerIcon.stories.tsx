import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { DangerIcon } from './DangerIcon';

export default {
	title: 'Icons/Icons/DangerIcon',
	component: DangerIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <DangerIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
