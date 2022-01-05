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

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <SeparatorIcon />;
		},
	});

	return <Component />;
};
