import React from 'react';
import { DataTable } from '../../../index';

const data = [
	{
		'id': 1,
		'first_name': 'Isaac',
		'last_name': 'Newton',
		'email': 'inewton@example.com',
		'occupation': 'Physicist',
	},
	{
		'id': 2,
		'first_name': 'Albert',
		'last_name': 'Einstein',
		'email': 'aeinstein@example.com',
		'occupation': 'Physicist',
	},
	{
		'id': 3,
		'first_name': 'Leonardo',
		'last_name': 'da Vinci',
		'email': 'ldvinci@example.com',
		'occupation': 'Engineer',
	},
	{
		'id': 4,
		'first_name': 'Aristotle',
		'last_name': null,
		'email': 'aristotle@example.com',
		'occupation': 'Tutor',
	},
	{
		'id': 5,
		'first_name': 'Galileo',
		'email': 'ggalilei@example.com',
		'occupation': 'Physicist',
	},
	{
		'id': 6,
		'first_name': 'Charles',
		'last_name': 'Darwin',
		'email': 'cdarwin@example.com',
		'occupation': 'Biologist',
	},
	{
		'id': 7,
		'first_name': 'Alexander',
		'last_name': 'Macedon',
		'email': 'amacedon@example.com',
		'occupation': 'Head of State',
	},
	{
		'id': 8,
		'first_name': 'Plato',
		'last_name': 'Plato',
		'email': 'plato@example.com',
		'occupation': 'Philosopher',
	},
	{
		'id': 9,
		'first_name': 'Mahatma',
		'last_name': 'Gandhi',
		'email': 'mgandhi@example.com',
		'occupation': 'Politician',
	},
	{
		'id': 10,
		'first_name': 'William',
		'last_name': 'Shakespeare',
		'email': 'wshakespear@example.com',
		'occupation': 'Playwright',
	},
];

export default React.createClass({
	render() {

		return(
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
