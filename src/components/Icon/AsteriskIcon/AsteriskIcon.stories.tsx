import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { AsteriskIcon } from './AsteriskIcon';

export default {
	title: 'Icons/Icons/AsteriskIcon',
	component: AsteriskIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <AsteriskIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
