import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { GlobeIcon } from './GlobeIcon';

export default {
	title: 'Icons/Icons/GlobeIcon',
	component: GlobeIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <GlobeIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
