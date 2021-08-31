import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconWithDirectionProps } from '../Icon';
import { DoubleChevronIcon } from './DoubleChevronIcon';

export default {
	title: 'Icons/Icons/DoubleChevronIcon',
	component: DoubleChevronIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconWithDirectionProps> = (args) => (
	<DoubleChevronIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
