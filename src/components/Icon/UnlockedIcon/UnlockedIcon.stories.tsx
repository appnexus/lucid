import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { UnlockedIcon } from './UnlockedIcon';

export default {
	title: 'Icons/Icons/UnlockedIcon',
	component: UnlockedIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <UnlockedIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
