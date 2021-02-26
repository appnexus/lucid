import React from 'react';
import createClass from 'create-react-class';
import { SimpleTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<SimpleTableLoadingSkeleton
				isLoading={true}
				height={100}
				header='Custom Header'
			/>
		);
	},
});
