import React from 'react';
import { Story, Meta } from '@storybook/react';

import WarningLightIcon, { IWarningLightIconProps } from './WarningLightIcon';

export default {
	title: 'Deprecated/WarningLightIcon',
	component: WarningLightIcon,
	parameters: {
		docs: {
			description: {
				component: WarningLightIcon.peek.description,
			},
		},
	},
	args: WarningLightIcon.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<IWarningLightIconProps> = (args) => {
	return <WarningLightIcon {...args} />;
};
