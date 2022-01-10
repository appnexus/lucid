import React from 'react';
import createClass from 'create-react-class';
import SmallDataTableLoadingSkeleton from './SmallDataTableLoadingSkeleton';

export default {
	title: 'Loading Indicator/SmallDataTableLoadingSkeleton',
	component: SmallDataTableLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (SmallDataTableLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <SmallDataTableLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return (
				<SmallDataTableLoadingSkeleton
					isLoading={true}
					width={700}
					header='Added Header'
				/>
			);
		},
	});

	return <Component />;
};
AddHeader.storyName = 'AddHeader';

/* Two Rows Two Columns */
export const TwoRowsTwoColumns = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<SmallDataTableLoadingSkeleton
						isLoading={true}
						width={300}
						numRows={2}
						numColumns={2}
						marginRight={100}
						marginBottom={30}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TwoRowsTwoColumns.storyName = 'TwoRowsTwoColumns';
