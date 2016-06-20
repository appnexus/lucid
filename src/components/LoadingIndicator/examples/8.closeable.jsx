import React from 'react';
import { BarChart, LoadingIndicator } from '../../../index';

export default React.createClass({
	getInitialState: () => ({ isLoading: true }),
	render() {
		return (
			<LoadingIndicator
				isLoading={this.state.isLoading}
				isCloseable
				onClose={() => this.setState({ isLoading: false })}
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
		);
	},
});
