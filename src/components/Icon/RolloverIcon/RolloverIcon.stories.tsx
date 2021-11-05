import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { RolloverIcon } from './RolloverIcon';

export default {
	title: 'Icons/Icons/RolloverIcon',
	component: RolloverIcon,
	argTypes: {
		size: {
			defaultValue: 16,
		},
		viewBox: {
			defaultValue: '0 0 16 16',
		},
	},
} as Meta;

//👇 We create a “primary” story of how args map to rendering
export const Primary: Story<IIconProps> = (args) => <RolloverIcon {...args} />;
