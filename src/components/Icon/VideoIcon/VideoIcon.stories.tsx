import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { VideoIcon } from './VideoIcon';

export default {
	title: 'Icons/Icons/VideoIcon',
	component: VideoIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <VideoIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
