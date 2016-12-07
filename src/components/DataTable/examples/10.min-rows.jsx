import React from 'react';
import _ from 'lodash';
import { DataTable } from '../../../index';

const data = [
	{
		id: '01',
		first_name: 'Isaac',
		last_name: 'Newton',
		email: 'inewton@example.com',
		occupation: 'Physicist',
		isSelected: true,
	},
	{
		id: '02',
		first_name: 'Albert',
		last_name: 'Einstein',
		email: 'aeinstein@example.com',
		occupation: 'Physicist',
		isActive: true,
	},
	{
		id: '03',
		first_name: 'Leonardo',
		last_name: 'da Vinci',
		email: 'ldvinci@example.com',
		occupation: 'Engineer',
	},
	{
		id: '04',
		first_name: 'Aristotle',
		last_name: '--',
		email: 'aristotle@example.com',
		occupation: 'Tutor',
	},
];

export default React.createClass({
	getInitialState() {
		return {
			activeIndex: 1,
			data,
		};
	},

	render() {
		const {
			activeIndex,
			data,
		} = this.state;

		return (
			<DataTable
				data={_.map(data, (row, index) => (index === activeIndex ? {...row, isActive: true} : row))}
				density='extended'
				isSelectable
				isActionable
				isFullWidth
				minRows={7}
			>
				<DataTable.Column
					field='id'
				>
					ID
				</DataTable.Column>

				<DataTable.Column
					field='first_name'
					width={100}
				>
					First
				</DataTable.Column>

				<DataTable.Column
					field='last_name'
					align='left'
					width={100}
				>
					Last
				</DataTable.Column>

				<DataTable.Column
					field='email'
					align='center'
				>
					E-Mail
				</DataTable.Column>

				<DataTable.Column
					field='occupation'
					align='right'
					width={100}
				>
					Occupation
				</DataTable.Column>
			</DataTable>
		);
	},
});
