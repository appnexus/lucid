import React from 'react';
import createClass from 'create-react-class';
import ComplexTableLoadingSkeleton from './ComplexTableLoadingSkeleton';

export default {
	title: 'Loading Indicator/ComplexTableLoadingSkeleton',
	component: ComplexTableLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (ComplexTableLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <ComplexTableLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return (
				<ComplexTableLoadingSkeleton isLoading={true} header='Added Header' />
			);
		},
	});

	return <Component />;
};
AddHeader.storyName = 'AddHeader';

/* Three Rows One Columns */
export const ThreeRowsOneColumns = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<ComplexTableLoadingSkeleton
						isLoading={true}
						width={860}
						numRows={3}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ThreeRowsOneColumns.storyName = 'ThreeRowsOneColumns';
