import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { SaveIcon } from './SaveIcon';

export default {
	title: 'Icons/Icons/SaveIcon',
	component: SaveIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <SaveIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
