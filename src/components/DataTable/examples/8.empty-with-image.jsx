import React from 'react';
import { DataTable } from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			data: [],
		};
	},

	render() {
		const {data} = this.state;

		return(
			<DataTable
				data={data}
				density='extended'
			>
				<DataTable.EmptyMessageTitle>This empty message has a large image in it.</DataTable.EmptyMessageTitle>
				<DataTable.EmptyMessageBody>
					<img src='https://dummyimage.com/375x200/ff69/fff' />
				</DataTable.EmptyMessageBody>
				<DataTable.Column
					field='id'
					width={41}
					align='center'
					hasBorderLeft
					hasBorderLeft
					isSortable
				>
					ID
				</DataTable.Column>

				<DataTable.ColumnGroup title='Name'>
					<DataTable.Column
						field='first_name'
						width={100}
						hasBorderLeft
					>
						First
					</DataTable.Column>

					<DataTable.Column
						field='last_name'
						align='left'
						width={100}
						hasBorderRight
					>
						Last
					</DataTable.Column>
				</DataTable.ColumnGroup>

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
					hasBorderLeft
				>
					Occupation
				</DataTable.Column>
			</DataTable>
		);
	},
});
