import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { WrenchIcon } from './WrenchIcon';

export default {
	title: 'Icons/Icons/WrenchIcon',
	component: WrenchIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <WrenchIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
