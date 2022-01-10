import React from 'react';
import createClass from 'create-react-class';
import HeaderLoadingSkeleton from './HeaderLoadingSkeleton';

export default {
	title: 'Loading Indicator/HeaderLoadingSkeleton',
	component: HeaderLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (HeaderLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <HeaderLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};
