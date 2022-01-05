import React from 'react';
import createClass from 'create-react-class';
import SeparatorIcon from './SeparatorIcon';

export default {
	title: 'Visual Design/SeparatorIcon',
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
