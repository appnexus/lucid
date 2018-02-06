import React from 'react';
import createClass from 'create-react-class';
import { BarChart } from '../../../index';

const { EmptyStateWrapper, EmptyStateWrapper: { Title, Body } } = BarChart;

export default createClass({
	render() {
		return (
			<BarChart data={[]} yAxisTitle="Revenue">
				<EmptyStateWrapper>
					<Title>
						Something went wrong.
					</Title>
					<Body
						style={{
							fontSize: '12px',
						}}
					>
						Echo park poutine esse tempor squid do. Lo-fi ramps XOXO chicharrones laboris, portland fugiat locavore. Fap four dollar toast keytar, cronut kogi fingerstache distillery microdosing everyday carry austin DIY dreamcatcher. Distillery flexitarian meditation laboris roof party. Cred raclette gastropub tilde PBR&B. Shoreditch poke adipisicing, reprehenderit lumbersexual succulents mustache officia franzen vinyl nostrud af. Hashtag bitters organic, before they sold out butcher cronut sapiente.
					</Body>
				</EmptyStateWrapper>
			</BarChart>
		);
	},
});
