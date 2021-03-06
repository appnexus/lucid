import React from 'react';
import createClass from 'create-react-class';
import { SimpleTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<SimpleTableLoadingSkeleton isLoading={true} height={70} numRows={3} />
			</div>
		);
	},
});
