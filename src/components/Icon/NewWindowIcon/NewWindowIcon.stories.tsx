import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { NewWindowIcon } from './NewWindowIcon';

export default {
	title: 'Icons/Icons/NewWindowIcon',
	component: NewWindowIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <NewWindowIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
