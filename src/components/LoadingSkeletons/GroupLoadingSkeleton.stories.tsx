import React from 'react';
import createClass from 'create-react-class';
import GroupLoadingSkeleton from './GroupLoadingSkeleton';

export default {
	title: 'Loading Indicator/GroupLoadingSkeleton',
	component: GroupLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (GroupLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <GroupLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return <GroupLoadingSkeleton isLoading={true} header='Added Header' />;
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
					<GroupLoadingSkeleton
						isLoading={true}
						width={250}
						numRows={2}
						numColumns={3}
						marginBottom={30}
						marginRight={30}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TwoRowsThreeColumns.storyName = 'TwoRowsThreeColumns';
