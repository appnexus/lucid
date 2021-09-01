import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { BarChartIcon } from './BarChartIcon';

export default {
	title: 'Icons/Icons/BarChartIcon',
	component: BarChartIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <BarChartIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
