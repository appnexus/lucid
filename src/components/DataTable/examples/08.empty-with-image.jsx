import React from 'react';
import createClass from 'create-react-class';
import { DataTable } from '../../../index';

const { EmptyStateWrapper, EmptyStateWrapper: { Title, Body } } = DataTable;

export default createClass({
	getInitialState() {
		return {
			data: [],
		};
	},

	render() {
		const { data } = this.state;

		return (
			<DataTable data={data} density="extended" isFullWidth>
				<EmptyStateWrapper>
					<Title>
						No items found.
					</Title>
					<Body>
						<img src="https://dummyimage.com/375x150/ff69/fff" />
					</Body>
				</EmptyStateWrapper>
				<DataTable.Column
					field="id"
					width={41}
					align="center"
					hasBorderLeft
					hasBorderLeft
					isSortable
				>
					ID
				</DataTable.Column>

				<DataTable.Column field="first_name" width={100} hasBorderLeft>
					First
				</DataTable.Column>

				<DataTable.Column
					field="last_name"
					align="left"
					width={100}
					hasBorderRight
				>
					Last
				</DataTable.Column>

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
