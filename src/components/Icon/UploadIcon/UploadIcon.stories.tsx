import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { UploadIcon } from './UploadIcon';

export default {
	title: 'Icons/Icons/UploadIcon',
	component: UploadIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <UploadIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
