import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { MinusIcon } from './MinusIcon';

export default {
	title: 'Icons/Icons/MinusIcon',
	component: MinusIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <MinusIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
