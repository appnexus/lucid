import React from 'react';
import createClass from 'create-react-class';
import { ComplexTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<ComplexTableLoadingSkeleton
					isLoading={true}
					width={800}
					height={100}
					numRows={3}
				/>
			</div>
		);
	},
});
