import React from 'react';
import { Story, Meta } from '@storybook/react';

import InfoLightIcon, { IInfoLightIconProps } from './InfoLightIcon';

export default {
	title: 'Deprecated/InfoLightIcon',
	component: InfoLightIcon,
	parameters: {
		docs: {
			description: {
				component: InfoLightIcon.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IInfoLightIconProps> = (args) => {
	return <InfoLightIcon {...args} />;
};
