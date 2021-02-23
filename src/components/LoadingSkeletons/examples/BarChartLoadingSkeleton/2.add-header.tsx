import React from 'react';
import createClass from 'create-react-class';
import { BarChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<BarChartLoadingSkeleton
				isLoading={true}
				width={700}
				height={300}
				header='BarChartLoadingSkeleton added header'
			/>
		);
	},
});
