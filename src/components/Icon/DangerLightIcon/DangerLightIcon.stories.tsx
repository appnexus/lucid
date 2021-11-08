import React from 'react';
import { DangerLightIcon } from './../../../index';

export default {
	title: 'Visual Design/Icons/DangerLightIcon',
	component: DangerLightIcon,
	parameters: {
		docs: {
			description: {
				component: (DangerLightIcon as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
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
Default.storyName = 'Default';
