import React from 'react';
import { LineChart, Button } from '../../../index';

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
                    <Button>Action</Button>
				</LineChart.EmptyMessageBody>
			</LineChart>
		);
	},
});
