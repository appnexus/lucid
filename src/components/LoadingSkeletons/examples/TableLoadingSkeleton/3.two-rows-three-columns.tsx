import React from 'react';
import createClass from 'create-react-class';
import { TableLoadingSkeleton } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<TableLoadingSkeleton
					isLoading={true}
					width={200}
					height={100}
					numRows={2}
					numColumns={3}
					header={'Rows And Columns'}
					marginRight={50}
					marginLeft={0}
					marginTop={0}
					marginBottom={20}
				/>
			</div>
		);
	},
});
