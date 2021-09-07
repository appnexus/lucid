import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { GetMaximumIcon } from './GetMaximumIcon';

export default {
	title: 'Icons/Icons/GetMaximumIcon',
	component: GetMaximumIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <GetMaximumIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
