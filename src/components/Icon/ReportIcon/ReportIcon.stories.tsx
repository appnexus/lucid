import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ReportIcon } from './ReportIcon';

export default {
	title: 'Icons/Icons/ReportIcon',
	component: ReportIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ReportIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
