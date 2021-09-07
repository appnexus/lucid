import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { TextIcon } from './TextIcon';

export default {
	title: 'Icons/Icons/TextIcon',
	component: TextIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <TextIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
