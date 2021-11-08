import React from 'react';
import createClass from 'create-react-class';
import { SeparatorIcon } from './../../../index';

export default {
	title: 'Visual Design/Icons/SeparatorIcon',
	component: SeparatorIcon,
	parameters: {
		docs: {
			description: {
				component: (SeparatorIcon as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
		render() {
			return <SeparatorIcon />;
		},
	});

	return <Component />;
};
Default.storyName = 'Default';
