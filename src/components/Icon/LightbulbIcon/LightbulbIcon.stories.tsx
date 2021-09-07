import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { LightbulbIcon } from './LightbulbIcon';

export default {
	title: 'Icons/Icons/LightbulbIcon',
	component: LightbulbIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <LightbulbIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
