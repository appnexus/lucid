import React from 'react';
import { InfoLightIcon } from './../../../index';

export default {
	title: 'Deprecated/InfoLightIcon',
	component: InfoLightIcon,
	parameters: {
		docs: {
			description: {
				component: (InfoLightIcon as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	return <InfoLightIcon />;
};
Default.storyName = 'Default';
