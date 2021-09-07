import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ShareIcon } from './ShareIcon';

export default {
	title: 'Icons/Icons/ShareIcon',
	component: ShareIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ShareIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
