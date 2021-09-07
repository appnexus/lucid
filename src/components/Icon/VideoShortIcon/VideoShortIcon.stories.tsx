import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { VideoShortIcon } from './VideoShortIcon';

export default {
	title: 'Icons/Icons/VideoShortIcon',
	component: VideoShortIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <VideoShortIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
