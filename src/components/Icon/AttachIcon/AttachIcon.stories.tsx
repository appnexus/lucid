import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconWithDirectionProps } from '../Icon';
import { AttachIcon } from './AttachIcon';

export default {
	title: 'Icons/Icons/AttachIcon',
	component: AttachIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconWithDirectionProps> = (args) => (
	<AttachIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
