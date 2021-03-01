import React from 'react';
import createClass from 'create-react-class';
import { LineChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<LineChartLoadingSkeleton
				isLoading={true}
				width={1000}
				height={300}
				header='Added Header'
			/>
		);
	},
});
