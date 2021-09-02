import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { EqualsIcon } from './EqualsIcon';

export default {
	title: 'Icons/Icons/EqualsIcon',
	component: EqualsIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <EqualsIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
