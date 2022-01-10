import React from 'react';
import createClass from 'create-react-class';
import LineChartLoadingSkeleton from './LineChartLoadingSkeleton';

export default {
	title: 'Loading Indicator/LineChartLoadingSkeleton',
	component: LineChartLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (LineChartLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <LineChartLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return (
				<LineChartLoadingSkeleton isLoading={true} header='Added Header' />
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
					<LineChartLoadingSkeleton
						isLoading={true}
						width={400}
						numRows={2}
						numColumns={2}
						marginRight={50}
						marginBottom={50}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TwoRowsTwoColumns.storyName = 'TwoRowsTwoColumns';
