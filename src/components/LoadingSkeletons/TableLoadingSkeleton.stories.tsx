import React from 'react';
import createClass from 'create-react-class';
import TableLoadingSkeleton from './TableLoadingSkeleton';

export default {
	title: 'Loading Indicator/TableLoadingSkeleton',
	component: TableLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (TableLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <TableLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return <TableLoadingSkeleton isLoading={true} header='Added Header' />;
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
					<TableLoadingSkeleton
						isLoading={true}
						width={200}
						height={100}
						numRows={2}
						numColumns={3}
						header={'Rows And Columns'}
						marginRight={50}
						marginLeft={0}
						marginTop={0}
						marginBottom={20}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TwoRowsThreeColumns.storyName = 'TwoRowsThreeColumns';
