import React from 'react';
import { LineChart } from '../../../index';

export default React.createClass({
	render() {
		return (
			<LineChart
				data={[]}

				yAxisFields={['blueberries']}
			>
				<LineChart.EmptyMessageTitle>
					Something went wrong.
				</LineChart.EmptyMessageTitle>
				<LineChart.EmptyMessageBody
					style={{
						fontSize: '12px',
					}}
				>
					Echo park poutine esse tempor squid do. Lo-fi ramps XOXO chicharrones laboris, portland fugiat locavore. Fap four dollar toast keytar, cronut kogi fingerstache distillery microdosing everyday carry austin DIY dreamcatcher. Distillery flexitarian meditation laboris roof party. Cred raclette gastropub tilde PBR&B. Shoreditch poke adipisicing, reprehenderit lumbersexual succulents mustache officia franzen vinyl nostrud af. Hashtag bitters organic, before they sold out butcher cronut sapiente.
				</LineChart.EmptyMessageBody>
			</LineChart>
		);
	},
});
