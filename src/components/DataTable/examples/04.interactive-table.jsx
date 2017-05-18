import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { DataTable } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			activeIndex: 1,
			currentlySortedField: 'id',
			currentlySortedFieldDirection: 'up',
			data: [
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
			],
		};
	},

	handleSelect(item, selectedIndex) {
		const { data } = this.state;

		this.setState({
			data: _.map(data, (row, rowIndex) => {
				if (rowIndex === selectedIndex) {
					return {
						...row,
						isSelected: !row.isSelected,
					};
				} else {
					return row;
				}
			}),
		});
	},

	handleSelectAll() {
		const { data } = this.state;

		const allSelected = _.every(data, 'isSelected');

		this.setState({
			data: _.map(data, row => {
				return {
					...row,
					isSelected: !allSelected,
				};
			}),
		});
	},

	handleRowClick(item, rowIndex) {
		this.setState({
			activeIndex: rowIndex,
		});
	},

	handleSort(field) {
		const {
			currentlySortedField,
			currentlySortedFieldDirection,
			data,
		} = this.state;

		const nextCurrentlySortedFieldDirection = currentlySortedField === field &&
			currentlySortedFieldDirection === 'up'
			? 'down'
			: 'up';
		const nextData = _.sortBy(data, field);

		this.setState({
			currentlySortedField: field,
			currentlySortedFieldDirection: nextCurrentlySortedFieldDirection,
			data: nextCurrentlySortedFieldDirection === 'up'
				? nextData
				: _.reverse(nextData),
			activeIndex: null,
		});
	},

	render() {
		const {
			activeIndex,
			data,
			currentlySortedField,
			currentlySortedFieldDirection,
		} = this.state;

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
				onRowClick={this.handleRowClick}
				onSelect={this.handleSelect}
				onSelectAll={this.handleSelectAll}
				onSort={this.handleSort}
			>
				<DataTable.Column
					field="id"
					width={41}
					align="center"
					hasBorderLeft
					hasBorderLeft
					isSortable
					isSorted={currentlySortedField === 'id'}
					sortDirection={currentlySortedFieldDirection}
				>
					ID
				</DataTable.Column>

				<DataTable.ColumnGroup title="Name">
					<DataTable.Column
						field="first_name"
						width={100}
						hasBorderLeft
						isResizable
						isSortable
						isSorted={currentlySortedField === 'first_name'}
						sortDirection={currentlySortedFieldDirection}
					>
						First
					</DataTable.Column>

					<DataTable.Column
						field="last_name"
						align="left"
						width={100}
						hasBorderRight
						isResizable
						isSortable
						isSorted={currentlySortedField === 'last_name'}
						sortDirection={currentlySortedFieldDirection}
					>
						Last
					</DataTable.Column>
				</DataTable.ColumnGroup>

				<DataTable.Column
					field="email"
					align="center"
					isSortable
					isSorted={currentlySortedField === 'email'}
					sortDirection={currentlySortedFieldDirection}
				>
					E-Mail
				</DataTable.Column>

				<DataTable.Column
					field="occupation"
					align="right"
					width={100}
					hasBorderLeft
					isSortable
					isSorted={currentlySortedField === 'occupation'}
					sortDirection={currentlySortedFieldDirection}
				>
					Occupation
				</DataTable.Column>
			</DataTable>
		);
	},
});
