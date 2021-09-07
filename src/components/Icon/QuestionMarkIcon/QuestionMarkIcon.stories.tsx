import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { QuestionMarkIcon } from './QuestionMarkIcon';

export default {
	title: 'Icons/Icons/QuestionMarkIcon',
	component: QuestionMarkIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <QuestionMarkIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
