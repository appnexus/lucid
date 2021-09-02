import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { EnvelopeIcon } from './EnvelopeIcon';

export default {
	title: 'Icons/Icons/EnvelopeIcon',
	component: EnvelopeIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <EnvelopeIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
