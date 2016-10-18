import React from 'react';
import { LineChart, Button } from '../../../index';

const {
  EmptyStateWrapper,
  EmptyStateWrapper: { Title, Body },
} = LineChart;

export default React.createClass({
	render() {
		return (
			<LineChart
				data={[]}

				yAxisFields={['blueberries']}
			>
				<EmptyStateWrapper>
					<Title>
						Something went wrong.
					</Title>
					<Body
						style={{
							fontSize: '12px',
						}}
					>
						<Button>Action</Button>
					</Body>
				</EmptyStateWrapper>
			</LineChart>
		);
	},
});
