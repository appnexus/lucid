import React from 'react';
import DataTable from '../DataTable';

const data = [
	{
		id: '01',
		first_name: 'Isaac',
		last_name: 'Newton',
		email: 'inewton@example.com',
		occupation: 'Physicist',
		isDisabled: true,
	},
	{
		id: '02',
		first_name: 'Albert',
		last_name: 'Einstein',
		email: 'aeinstein@example.com',
		occupation: 'Physicist',
		isDisabled: false,
	},
	{
		id: '03',
		first_name: 'Leonardo',
		last_name: 'da Vinci',
		email: 'ldvinci@example.com',
		occupation: 'Engineer',
		isDisabled: true,
	},
	{
		id: '04',
		first_name: 'Aristotle',
		last_name: '--',
		email: 'aristotle@example.com',
		occupation: 'Tutor',
		isDisabled: false,
	},
	{
		id: '05',
		first_name: 'Galileo',
		last_name: 'Galilei',
		email: 'ggalilei@example.com',
		occupation: 'Physicist',
		isDisabled: true,
	},
	{
		id: '06',
		first_name: 'Charles',
		last_name: 'Darwin',
		email: 'cdarwin@example.com',
		occupation: 'Biologist',
		isDisabled: false,
	},
	{
		id: '07',
		first_name: 'Alexander',
		last_name: 'Macedon',
		email: 'amacedon@example.com',
		occupation: 'Head of State',
		isDisabled: true,
	},
	{
		id: '08',
		first_name: 'Plato',
		last_name: 'Plato',
		email: 'plato@example.com',
		occupation: 'Philosopher',
		isDisabled: false,
	},
	{
		id: '09',
		first_name: 'Mahatma',
		last_name: 'Gandhi',
		email: 'mgandhi@example.com',
		occupation: 'Politician',
		isDisabled: true,
	},
	{
		id: '10',
		first_name: 'William',
		last_name: 'Shakespeare',
		email: 'wshakespear@example.com',
		occupation: 'Playwright',
		isDisabled: false,
	},
];

export default React.createClass({
	render() {

		return (
			<DataTable
				data={data}
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
