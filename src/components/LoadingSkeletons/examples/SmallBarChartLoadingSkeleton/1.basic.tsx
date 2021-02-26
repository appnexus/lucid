import React from 'react';
import createClass from 'create-react-class';
import { SmallBarChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return <SmallBarChartLoadingSkeleton isLoading={true} height={100} />;
	},
});
