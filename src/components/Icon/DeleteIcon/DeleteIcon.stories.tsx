import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { DeleteIcon } from './DeleteIcon';

export default {
	title: 'Icons/Icons/DeleteIcon',
	component: DeleteIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <DeleteIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
