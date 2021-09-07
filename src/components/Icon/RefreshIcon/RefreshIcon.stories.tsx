import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { RefreshIcon } from './RefreshIcon';

export default {
	title: 'Icons/Icons/RefreshIcon',
	component: RefreshIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <RefreshIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
