import React from 'react';
import createClass from 'create-react-class';
import { GroupLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<GroupLoadingSkeleton
					isLoading={true}
					width={250}
					numRows={2}
					numColumns={3}
					marginBottom={30}
					marginRight={30}
				/>
			</div>
		);
	},
});
