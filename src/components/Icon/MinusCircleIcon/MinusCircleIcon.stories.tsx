import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { MinusCircleIcon } from './MinusCircleIcon';

export default {
	title: 'Icons/Icons/MinusCircleIcon',
	component: MinusCircleIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <MinusCircleIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
