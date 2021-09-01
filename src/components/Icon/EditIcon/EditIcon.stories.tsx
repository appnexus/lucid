import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { EditIcon } from './EditIcon';

export default {
	title: 'Icons/Icons/EditIcon',
	component: EditIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <EditIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
