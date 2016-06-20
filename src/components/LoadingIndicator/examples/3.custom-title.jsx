import React from 'react';
import { BarChart, LoadingIndicator } from '../../../index';

const { Title } = LoadingIndicator;

export default React.createClass({
	render() {
		return (
			<div>

				<LoadingIndicator isLoading>
					<BarChart
						data={[
							{ x: '2015-01-01', y: 1 },
							{ x: '2015-01-02', y: 2 },
							{ x: '2015-01-03', y: 3 },
							{ x: '2015-01-04', y: 5 },
						]}
					/>
					<LoadingIndicator.Title>Enhancing...</LoadingIndicator.Title>
				</LoadingIndicator>

				<LoadingIndicator
					isLoading
					Title='Zooming...'
				>
					<BarChart
						data={[
							{ x: '2015-01-01', y: 1 },
							{ x: '2015-01-02', y: 2 },
							{ x: '2015-01-03', y: 3 },
							{ x: '2015-01-04', y: 5 },
						]}
					/>
				</LoadingIndicator>

			</div>
		);
	},
});
