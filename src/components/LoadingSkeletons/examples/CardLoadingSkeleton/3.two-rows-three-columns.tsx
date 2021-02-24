import React from 'react';
import createClass from 'create-react-class';
import { CardLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<CardLoadingSkeleton
					isLoading={true}
					width={200}
					height={50}
					numRows={2}
					numColumns={3}
				/>
			</div>
		);
	},
});
