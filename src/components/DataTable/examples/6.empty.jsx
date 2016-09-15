import React from 'react';
import _ from 'lodash';
import { DataTable } from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			activeIndex: 1,
			currentlySortedField: 'id',
			currentlySortedFieldDirection: 'up',
			data: [],
		};
	},

	handleSelect(item, selectedIndex) {
		const {
			data,
		} = this.state;

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
		const {
			data,
		} = this.state;

		const allSelected = _.every(data, 'isSelected');

		this.setState({
			data: _.map(data, (row) => {
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
		})
	},

	handleSort(field) {
		const {
			currentlySortedField,
			currentlySortedFieldDirection,
			data,
		} = this.state;

		const nextCurrentlySortedFieldDirection = (currentlySortedField === field && currentlySortedFieldDirection === 'up' ? 'down' : 'up');
		const nextData = _.sortBy(data, field);

		this.setState({
			currentlySortedField: field,
			currentlySortedFieldDirection: nextCurrentlySortedFieldDirection,
			data: nextCurrentlySortedFieldDirection === 'up' ? nextData : _.reverse(nextData),
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

		return(
			<DataTable
				data={_.map(data, (row, index) => (index === activeIndex ? {...row, isActive: true} : row))}
				density='extended'
				isSelectable
				isActionable
				onRowClick={this.handleRowClick}
				onSelect={this.handleSelect}
				onSelectAll={this.handleSelectAll}
				onSort={this.handleSort}
			>
				<DataTable.Column
					field='id'
					width={41}
					align='center'
					hasBorderLeft
					hasBorderLeft
					isSortable
					isSorted={currentlySortedField === 'id'}
					sortDirection={currentlySortedFieldDirection}
				>
					ID
				</DataTable.Column>

				<DataTable.ColumnGroup title='Name'>
					<DataTable.Column
						field='first_name'
						width={100}
						hasBorderLeft
						isSortable
						isSorted={currentlySortedField === 'first_name'}
						sortDirection={currentlySortedFieldDirection}
					>
						First
					</DataTable.Column>

					<DataTable.Column
						field='last_name'
						align='left'
						width={100}
						hasBorderRight
						isSortable
						isSorted={currentlySortedField === 'last_name'}
						sortDirection={currentlySortedFieldDirection}
					>
						Last
					</DataTable.Column>
				</DataTable.ColumnGroup>

				<DataTable.Column
					field='email'
					align='center'
					isSortable
					isSorted={currentlySortedField === 'email'}
					sortDirection={currentlySortedFieldDirection}
				>
					E-Mail
				</DataTable.Column>

				<DataTable.Column
					field='occupation'
					align='right'
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
