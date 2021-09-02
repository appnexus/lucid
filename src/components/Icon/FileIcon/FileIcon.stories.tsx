import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { FileIcon } from './FileIcon';

export default {
	title: 'Icons/Icons/FileIcon',
	component: FileIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <FileIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
