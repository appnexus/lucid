import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { VideoLongIcon } from './VideoLongIcon';

export default {
	title: 'Icons/Icons/VideoLongIcon',
	component: VideoLongIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <VideoLongIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
