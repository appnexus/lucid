import React from 'react';
import createClass from 'create-react-class';
import { LineChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return <LineChartLoadingSkeleton isLoading={true} />;
	},
});
