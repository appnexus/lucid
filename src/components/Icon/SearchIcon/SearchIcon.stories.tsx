import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { SearchIcon } from './SearchIcon';

export default {
	title: 'Icons/Icons/SearchIcon',
	component: SearchIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <SearchIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
