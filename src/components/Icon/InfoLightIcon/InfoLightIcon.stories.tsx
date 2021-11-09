import React from 'react';
import { InfoLightIcon } from './../../../index';

export default {
	title: 'Visual Design/Icons/InfoLightIcon',
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
