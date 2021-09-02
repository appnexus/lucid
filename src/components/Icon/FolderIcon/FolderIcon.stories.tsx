import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { FolderIcon } from './FolderIcon';

export default {
	title: 'Icons/Icons/FolderIcon',
	component: FolderIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <FolderIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
