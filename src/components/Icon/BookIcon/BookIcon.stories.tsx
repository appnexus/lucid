import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { BookIcon } from './BookIcon';

export default {
	title: 'Icons/Icons/BookIcon',
	component: BookIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <BookIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
