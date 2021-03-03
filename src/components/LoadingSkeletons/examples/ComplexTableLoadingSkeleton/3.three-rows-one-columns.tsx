import React from 'react';
import createClass from 'create-react-class';
import { ComplexTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<ComplexTableLoadingSkeleton isLoading={true} width={860} numRows={3} />
			</div>
		);
	},
});
