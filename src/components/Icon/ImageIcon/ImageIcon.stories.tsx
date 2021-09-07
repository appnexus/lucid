import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { ImageIcon } from './ImageIcon';

export default {
	title: 'Icons/Icons/ImageIcon',
	component: ImageIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <ImageIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
