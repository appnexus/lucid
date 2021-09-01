import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { DuplicateIcon } from './DuplicateIcon';

export default {
	title: 'Icons/Icons/DuplicateIcon',
	component: DuplicateIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <DuplicateIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
