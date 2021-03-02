import React from 'react';
import createClass from 'create-react-class';
import { SingleLineLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<SingleLineLoadingSkeleton
					isLoading={true}
					width={250}
					height={20}
					numRows={2}
					numColumns={3}
					marginRight={20}
					marginBottom={10}
				/>
			</div>
		);
	},
});
