import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { TicketIcon } from './TicketIcon';

export default {
	title: 'Icons/Icons/TicketIcon',
	component: TicketIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <TicketIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
