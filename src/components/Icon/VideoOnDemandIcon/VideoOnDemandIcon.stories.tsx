import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { VideoOnDemandIcon } from './VideoOnDemandIcon';

export default {
	title: 'Icons/Icons/VideoOnDemandIcon',
	component: VideoOnDemandIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <VideoOnDemandIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
