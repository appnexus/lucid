import React from 'react';
import createClass from 'create-react-class';
import { BarChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<BarChartLoadingSkeleton isLoading={true} width={840} height={200} />
		);
	},
});
