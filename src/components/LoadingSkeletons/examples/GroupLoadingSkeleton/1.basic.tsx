import React from 'react';
import createClass from 'create-react-class';
import { GroupLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return <GroupLoadingSkeleton isLoading={true} />;
	},
});
