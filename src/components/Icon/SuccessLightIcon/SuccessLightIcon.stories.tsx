import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SuccessLightIcon, ISuccessLightIconProps } from './SuccessLightIcon';

export default {
	title: 'Icons/Icons/SuccessLightIcon',
	component: SuccessLightIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ISuccessLightIconProps> = (args) => (
	<SuccessLightIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
