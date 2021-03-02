import React from 'react';
import createClass from 'create-react-class';
import { SingleLineLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<SingleLineLoadingSkeleton
				isLoading={true}
				width={500}
				header='Custom Header'
			/>
		);
	},
});
