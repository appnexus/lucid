import React from 'react';
import createClass from 'create-react-class';
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
	{
		id: '05',
		first_name: 'Galileo',
		last_name: 'Galilei',
		email: 'ggalilei@example.com',
		occupation: 'Physicist',
	},
	{
		id: '06',
		first_name: 'Charles',
		last_name: 'Darwin',
		email: 'cdarwin@example.com',
		occupation: 'Biologist',
	},
	{
		id: '07',
		first_name: 'Alexander',
		last_name: 'Macedon',
		email: 'amacedon@example.com',
		occupation: 'Head of State',
	},
	{
		id: '08',
		first_name: 'Plato',
		last_name: 'Plato',
		email: 'plato@example.com',
		occupation: 'Philosopher',
	},
	{
		id: '09',
		first_name: 'Mahatma',
		last_name: 'Gandhi',
		email: 'mgandhi@example.com',
		occupation: 'Politician',
	},
	{
		id: '10',
		first_name: 'William',
		last_name: 'Shakespeare',
		email: 'wshakespear@example.com',
		occupation: 'Playwright',
	},
];

export default createClass({
	render() {
		return (
			<DataTable data={data} density="extended" isSelectable isActionable>
				<DataTable.Column field="id" hasBorderLeft>
					ID
				</DataTable.Column>

				<DataTable.ColumnGroup title="Name" align="left">
					<DataTable.Column
						field="first_name"
						width={100}
						hasBorderLeft
						isSortable
					>
						First
					</DataTable.Column>

					<DataTable.Column
						field="last_name"
						align="left"
						width={100}
						hasBorderRight
						isSortable
					>
						Last
					</DataTable.Column>
				</DataTable.ColumnGroup>

				<DataTable.Column field="email" align="center">
					E-Mail
				</DataTable.Column>

				<DataTable.Column
					field="occupation"
					align="right"
					width={100}
					hasBorderLeft
				>
					Occupation
				</DataTable.Column>
			</DataTable>
		);
	},
});
