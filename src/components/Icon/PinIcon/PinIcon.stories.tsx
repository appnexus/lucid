import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconWithDirectionProps } from '../Icon';
import { PinIcon } from './PinIcon';

export default {
	title: 'Icons/Icons/PinIcon',
	component: PinIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconWithDirectionProps> = (args) => (
	<PinIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
