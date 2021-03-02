import React from 'react';
import createClass from 'create-react-class';
import { ComplexTableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<ComplexTableLoadingSkeleton isLoading={true} header='Added Header' />
		);
	},
});
