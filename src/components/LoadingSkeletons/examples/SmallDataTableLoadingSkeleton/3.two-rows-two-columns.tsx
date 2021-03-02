import React from 'react';
import createClass from 'create-react-class';
import { SmallDataTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<SmallDataTableLoadingSkeleton
					isLoading={true}
					width={300}
					numRows={2}
					numColumns={2}
					marginRight={100}
					marginBottom={30}
				/>
			</div>
		);
	},
});
