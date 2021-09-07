import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ViewTableIcon } from './ViewTableIcon';

export default {
	title: 'Icons/Icons/ViewTableIcon',
	component: ViewTableIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ViewTableIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
