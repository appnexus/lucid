import React from 'react';
import createClass from 'create-react-class';
import { HeaderLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return <HeaderLoadingSkeleton isLoading={true} />;
	},
});
