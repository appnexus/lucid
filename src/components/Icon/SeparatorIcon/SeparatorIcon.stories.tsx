import React from 'react';
import { Story, Meta } from '@storybook/react';

import SeparatorIcon, { ISeparatorIconProps } from './SeparatorIcon';

export default {
	title: 'Visual Design/SeparatorIcon',
	component: SeparatorIcon,
	parameters: {
		docs: {
			description: {
				component: (SeparatorIcon as any).peek.description,
			},
		},
	},
	args: SeparatorIcon.defaultProps,
} as Meta;

/* Basic */
export const BasicSeparatorIcon: Story<ISeparatorIconProps> = (args) => {
	return <SeparatorIcon {...args} />;
};
