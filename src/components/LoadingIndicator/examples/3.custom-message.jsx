import React from 'react';
import createClass from 'create-react-class';
import { BarChart, LoadingIndicator, LoadingIcon } from '../../../index';

const {
	LoadingMessage,
	LoadingMessage: { Title, Body, Icon },
} = LoadingIndicator;

export default createClass({
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
					<LoadingMessage>
						<Icon><LoadingIcon speed="slow" /></Icon>
						<Title>Custom Title</Title>
						<Body>Custom Body</Body>
					</LoadingMessage>
				</LoadingIndicator>

				<LoadingIndicator isLoading>
					<BarChart
						data={[
							{ x: '2015-01-01', y: 1 },
							{ x: '2015-01-02', y: 2 },
							{ x: '2015-01-03', y: 3 },
							{ x: '2015-01-04', y: 5 },
						]}
					/>
					<LoadingMessage
						Icon={<LoadingIcon speed="fast" />}
						Title="Enhancing..."
						Body="Please wait"
					/>
				</LoadingIndicator>

			</div>
		);
	},
});
