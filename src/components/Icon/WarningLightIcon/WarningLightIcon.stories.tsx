import React from 'react';
import WarningLightIcon from './WarningLightIcon';

export default {
	title: 'Deprecated/WarningLightIcon',
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
