import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { PlusIcon } from './PlusIcon';

export default {
	title: 'Icons/Icons/PlusIcon',
	component: PlusIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <PlusIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
