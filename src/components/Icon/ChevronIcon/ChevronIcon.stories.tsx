import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconWithDirectionProps } from '../Icon';
import { ChevronIcon } from './ChevronIcon';

export default {
	title: 'Icons/Icons/ChevronIcon',
	component: ChevronIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconWithDirectionProps> = (args) => (
	<ChevronIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
