import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { AddColumnIcon } from './AddColumnIcon';

export default {
	title: 'Icons/Icons/AddColumnIcon',
	component: AddColumnIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <AddColumnIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
