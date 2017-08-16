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
			<DataTable data={data} density="extended" isFullWidth minRows={15}>
				<EmptyStateWrapper>
					<Title>
						Something went wrong.
					</Title>
					<Body style={{ fontSize: '12px' }}>
						Echo park poutine esse tempor squid do. Lo-fi ramps XOXO chicharrones laboris, portland fugiat locavore. Fap four dollar toast keytar, cronut kogi fingerstache distillery microdosing everyday carry austin DIY dreamcatcher. Distillery flexitarian meditation laboris roof party. Cred raclette gastropub tilde PBR&B. Shoreditch poke adipisicing, reprehenderit lumbersexual succulents mustache officia franzen vinyl nostrud af. Hashtag bitters organic, before they sold out butcher cronut sapiente.
					</Body>
				</EmptyStateWrapper>
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
