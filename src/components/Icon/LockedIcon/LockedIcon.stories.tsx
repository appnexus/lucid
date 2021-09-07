import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { LockedIcon } from './LockedIcon';

export default {
	title: 'Icons/Icons/LockedIcon',
	component: LockedIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <LockedIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
