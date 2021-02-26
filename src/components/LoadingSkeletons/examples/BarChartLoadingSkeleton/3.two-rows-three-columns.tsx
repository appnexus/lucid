import React from 'react';
import createClass from 'create-react-class';
import { BarChartLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<BarChartLoadingSkeleton
					isLoading={true}
					width={210}
					height={200}
					numRows={2}
					numColumns={3}
					marginRight={100}
					marginLeft={0}
					marginTop={0}
					marginBottom={50}
				/>
			</div>
		);
	},
});
