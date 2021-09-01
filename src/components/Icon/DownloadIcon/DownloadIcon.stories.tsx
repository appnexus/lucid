import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { DownloadIcon } from './DownloadIcon';

export default {
	title: 'Icons/Icons/DownloadIcon',
	component: DownloadIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <DownloadIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
