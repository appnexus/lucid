import React from 'react';
import createClass from 'create-react-class';
import { SimpleTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<SimpleTableLoadingSkeleton isLoading={true} numRows={3} />
			</div>
		);
	},
});
