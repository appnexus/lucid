import React from 'react';
import createClass from 'create-react-class';
import { CardLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return <CardLoadingSkeleton isLoading={true} width={200} height={100} />;
	},
});
