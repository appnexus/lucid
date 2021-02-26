import React from 'react';
import createClass from 'create-react-class';
import { SmallDataTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return <SmallDataTableLoadingSkeleton isLoading={true} height={100} />;
	},
});
