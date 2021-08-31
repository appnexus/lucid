import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { AudioIcon } from './AudioIcon';

export default {
	title: 'Icons/Icons/AudioIcon',
	component: AudioIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <AudioIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
