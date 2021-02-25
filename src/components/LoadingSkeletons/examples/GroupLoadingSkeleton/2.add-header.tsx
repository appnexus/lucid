import React from 'react';
import createClass from 'create-react-class';
import { GroupLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<GroupLoadingSkeleton
				isLoading={true}
				width={200}
				height={50}
				header='Added Header'
			/>
		);
	},
});
