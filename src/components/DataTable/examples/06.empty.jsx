import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { DataTable } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			activeIndex: 1,
			data: [],
		};
	},

	render() {
		const { activeIndex, data } = this.state;

		return (
			<DataTable
				data={_.map(
					data,
					(row, index) =>
						(index === activeIndex ? { ...row, isActive: true } : row)
				)}
				density="extended"
				isFullWidth
			>
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
