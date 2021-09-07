import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { RunReportIcon } from './RunReportIcon';

export default {
	title: 'Icons/Icons/RunReportIcon',
	component: RunReportIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <RunReportIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
