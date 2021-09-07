import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { MaximizeIcon } from './MaximizeIcon';

export default {
	title: 'Icons/Icons/MaximizeIcon',
	component: MaximizeIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <MaximizeIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
