import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { FilterIcon } from './FilterIcon';

export default {
	title: 'Icons/Icons/FilterIcon',
	component: FilterIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <FilterIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
