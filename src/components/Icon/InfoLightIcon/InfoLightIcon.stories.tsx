import React from 'react';
import InfoLightIcon from './InfoLightIcon';

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

/* Basic */
export const Basic = () => {
	return <InfoLightIcon />;
};
