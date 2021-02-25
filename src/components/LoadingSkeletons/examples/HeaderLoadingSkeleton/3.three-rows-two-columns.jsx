import React from 'react';
import createClass from 'create-react-class';
import { HeaderLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<HeaderLoadingSkeleton
					isLoading={true}
					width={400}
					height={100}
					numRows={3}
					numColumns={2}
					marginRight={20}
				/>
			</div>
		);
	},
});
