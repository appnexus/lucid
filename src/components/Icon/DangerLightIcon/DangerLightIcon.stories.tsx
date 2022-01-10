import React from 'react';
import DangerLightIcon from './DangerLightIcon';

export default {
	title: 'Deprecated/DangerLightIcon',
	component: DangerLightIcon,
	parameters: {
		docs: {
			description: {
				component: (DangerLightIcon as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	return (
		<div>
			<DangerLightIcon />
			<br />
			<DangerLightIcon isClickable />
			<br />
			<DangerLightIcon isDisabled />
			<br />
		</div>
	);
};
