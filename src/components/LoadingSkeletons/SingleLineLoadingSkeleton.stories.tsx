import React from 'react';
import createClass from 'create-react-class';
import SingleLineLoadingSkeleton from './SingleLineLoadingSkeleton';

export default {
	title: 'Loading Indicator/SingleLineLoadingSkeleton',
	component: SingleLineLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (SingleLineLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <SingleLineLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return (
				<SingleLineLoadingSkeleton
					isLoading={true}
					width={700}
					height={50}
					header='Added Header'
				/>
			);
		},
	});

	return <Component />;
};
AddHeader.storyName = 'AddHeader';

/* Two Rows Three Columns */
export const TwoRowsThreeColumns = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<SingleLineLoadingSkeleton
						isLoading={true}
						width={250}
						height={20}
						numRows={2}
						numColumns={3}
						marginRight={20}
						marginBottom={10}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TwoRowsThreeColumns.storyName = 'TwoRowsThreeColumns';
