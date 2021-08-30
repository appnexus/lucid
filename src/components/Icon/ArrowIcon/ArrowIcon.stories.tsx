import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconWithDirectionProps } from '../Icon';
import { ArrowIcon } from './ArrowIcon';

export default {
	title: 'Icons/Icons/ArrowIcon',
	component: ArrowIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconWithDirectionProps> = (args) => (
	<ArrowIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
