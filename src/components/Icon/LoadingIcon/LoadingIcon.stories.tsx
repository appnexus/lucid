import React from 'react';
import { Story, Meta } from '@storybook/react';
import { LoadingIcon, ILoadingIconProps } from './LoadingIcon';

export default {
	title: 'Icons/Icons/LoadingIcon',
	component: LoadingIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ILoadingIconProps> = (args) => <LoadingIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
