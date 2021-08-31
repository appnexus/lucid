import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { AnalyzeDataIcon } from './AnalyzeDataIcon';

export default {
	title: 'Icons/Icons/AnalyzeDataIcon',
	component: AnalyzeDataIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <AnalyzeDataIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
