import React from 'react';
import createClass from 'create-react-class';
import CardLoadingSkeleton from './CardLoadingSkeleton';

export default {
	title: 'Loading Indicator/CardLoadingSkeleton',
	component: CardLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (CardLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <CardLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return <CardLoadingSkeleton isLoading={true} header='Added Header' />;
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
					<CardLoadingSkeleton
						isLoading={true}
						width={200}
						height={50}
						numRows={2}
						numColumns={3}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TwoRowsThreeColumns.storyName = 'TwoRowsThreeColumns';
