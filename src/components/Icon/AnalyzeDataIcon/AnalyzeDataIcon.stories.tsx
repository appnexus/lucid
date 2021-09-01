import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconWithDirectionProps } from '../Icon';
import { AnalyzeDataIcon } from './AnalyzeDataIcon';

export default {
	title: 'Icons/Icons/AnalyzeDataIcon',
	component: AnalyzeDataIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconWithDirectionProps> = (args) => (
	<AnalyzeDataIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
