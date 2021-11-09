import React from 'react';
import createClass from 'create-react-class';
import { CardLoadingSkeleton } from './../../index';

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

/* Default */
export const Default = () => {
	const Component = createClass({
		render() {
			return <CardLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

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
