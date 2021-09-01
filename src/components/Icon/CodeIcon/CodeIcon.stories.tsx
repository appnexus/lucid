import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { CodeIcon } from './CodeIcon';

export default {
	title: 'Icons/Icons/CodeIcon',
	component: CodeIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <CodeIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
