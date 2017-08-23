import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { DataTable } from '../../../index';
import { SuccessIcon } from '../../../index';

const data = [
	{
		id: 1,
		first_name: 'Isaac',
		last_name: 'Newton',
		email: 'inewton@example.com',
		occupation: 'Physicist',
		salary: '$100.01',
		status: <SuccessIcon />,
	},
	{
		id: 2,
		first_name: 'Albert',
		last_name: 'Einstein',
		email: 'aeinstein@example.com',
		occupation: 'Physicist',
		salary: '$100.02',
		status: <SuccessIcon />,
	},
	{
		id: 3,
		first_name: 'Leonardo',
		last_name: 'da Vinci',
		email: 'ldvinci@example.com',
		occupation: 'Engineer',
		salary: '$100.03',
		status: <SuccessIcon />,
	},
	{
		id: 4,
		first_name: 'Aristotle',
		last_name: null,
		email: 'aristotle@example.com',
		occupation: 'Tutor',
		salary: '$100.04',
		status: <SuccessIcon />,
	},
];

export default createClass({
	getInitialState() {
		return {
			activeIndex: 1,
			data,
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
				isSelectable
				isActionable
				isFullWidth
				minRows={7}
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

				<DataTable.Column field="email" align="left">
					E-Mail
				</DataTable.Column>

				<DataTable.Column field="occupation" align="left" width={100}>
					Occupation
				</DataTable.Column>

				<DataTable.Column field="salary" align="right" width={100}>
					Salary
				</DataTable.Column>

				<DataTable.Column field="status" align="center" width={100}>
					Status
				</DataTable.Column>
			</DataTable>
		);
	},
});
