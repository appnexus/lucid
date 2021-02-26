import React from 'react';
import createClass from 'create-react-class';
import { SmallBarChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<SmallBarChartLoadingSkeleton
					isLoading={true}
					width={300}
					height={100}
					numRows={2}
					numColumns={2}
					marginRight={100}
					marginBottom={30}
				/>
			</div>
		);
	},
});
