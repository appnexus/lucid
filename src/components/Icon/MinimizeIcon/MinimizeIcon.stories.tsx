import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { MinimizeIcon } from './MinimizeIcon';

export default {
	title: 'Icons/Icons/MinimizeIcon',
	component: MinimizeIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <MinimizeIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
