import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { CalculatorIcon } from './CalculatorIcon';

export default {
	title: 'Icons/Icons/CalculatorIcon',
	component: CalculatorIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <CalculatorIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
