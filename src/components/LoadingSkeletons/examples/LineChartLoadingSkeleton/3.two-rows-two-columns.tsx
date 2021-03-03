import React from 'react';
import createClass from 'create-react-class';
import { LineChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<LineChartLoadingSkeleton
					isLoading={true}
					width={400}
					numRows={2}
					numColumns={2}
					marginRight={50}
					marginBottom={50}
				/>
			</div>
		);
	},
});
