import React from 'react';
import { WarningLightIcon } from './../../../index';

export default {
	title: 'Visual Design/Icons/WarningLightIcon',
	component: WarningLightIcon,
	parameters: {
		docs: {
			description: {
				component: (WarningLightIcon as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	return <WarningLightIcon />;
};
Default.storyName = 'Default';
