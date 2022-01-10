import React from 'react';
import createClass from 'create-react-class';
import BarChartLoadingSkeleton from './BarChartLoadingSkeleton';

export default {
	title: 'Loading Indicator/BarChartLoadingSkeleton',
	component: BarChartLoadingSkeleton,
	parameters: {
		docs: {
			description: {
				component: (BarChartLoadingSkeleton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return <BarChartLoadingSkeleton isLoading={true} />;
		},
	});

	return <Component />;
};

/* Add Header */
export const AddHeader = () => {
	const Component = createClass({
		render() {
			return (
				<BarChartLoadingSkeleton
					isLoading={true}
					width={880}
					header='BarChartLoadingSkeleton added header'
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
					<BarChartLoadingSkeleton
						isLoading={true}
						width={210}
						height={200}
						numRows={2}
						numColumns={3}
						marginRight={100}
						marginLeft={0}
						marginTop={0}
						marginBottom={50}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TwoRowsThreeColumns.storyName = 'TwoRowsThreeColumns';
