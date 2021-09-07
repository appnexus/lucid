import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ShoppingCartIcon } from './ShoppingCartIcon';

export default {
	title: 'Icons/Icons/ShoppingCartIcon',
	component: ShoppingCartIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ShoppingCartIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
