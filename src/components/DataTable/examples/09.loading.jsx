import React from 'react';
import createClass from 'create-react-class';
import { DataTable } from '../../../index';

export default createClass({
	render() {
		return (
			<DataTable isFullWidth isLoading data={[]}>
				<DataTable.Column field="id">
					ID
				</DataTable.Column>

				<DataTable.Column field="first_name" width={100}>
					First
				</DataTable.Column>

				<DataTable.Column field="last_name" align="left" width={100}>
					Last
				</DataTable.Column>

				<DataTable.Column field="email" align="center">
					E-Mail
				</DataTable.Column>

				<DataTable.Column field="occupation" align="right" width={100}>
					Occupation
				</DataTable.Column>
			</DataTable>
		);
	},
});
