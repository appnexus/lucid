import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';

import { ILoadingIndicatorProps } from './LoadingIndicator';
import Button from '../Button/Button';
import LoadingIndicator from './LoadingIndicator';
import BarChart from '../BarChart/BarChart';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';

export default {
	title: 'Loading Indicator/LoadingIndicator',
	component: LoadingIndicator,
	parameters: {
		docs: {
			description: {
				component: LoadingIndicator.peek.description,
			},
		},
	},
} as Meta;

/* Interactive */
export const Interactive: Story<ILoadingIndicatorProps> = (args) => {
	const dates = ['2015-01-01', '2015-01-02', '2015-01-03', '2015-01-04'];
	const getData = () =>
		_.map(dates, (date) => ({ x: date, y: _.random(1, 5) }));

	const [state, setState] = useState({
		isLoading: true,
		data: _.map(dates, (date) => ({ x: date, y: 0 })),
		overlayKind: 'dark',
	});

	const handleOverlayKindClick = () => {
		setState({
			...state,
			overlayKind: state.overlayKind === 'dark' ? 'light' : 'dark',
		});
	};

	useEffect(() => {
		const removeIsLoading = setTimeout(
			() => setState({ ...state, isLoading: false, data: getData() }),
			1000
		);
		return () => {
			clearTimeout(removeIsLoading);
		};
	}, []);

	return (
		<LoadingIndicator
			{...args}
			isLoading={state.isLoading}
			overlayKind={state.overlayKind as any}
		>
			<Button
				style={{ margin: 10 }}
				onClick={() => {
					setState({ ...state, isLoading: true });
					setTimeout(
						() => setState({ ...state, isLoading: false, data: getData() }),
						2000
					);
				}}
			>
				Get more data
			</Button>
			{/* <Button onClick={handleOverlayKindClick}>Switch overlay color</Button> */}
			<Button onClick={handleOverlayKindClick}>
				{`${state.overlayKind} overlay color`}
			</Button>
			<BarChart width={750} data={state.data} yAxisTitle='Revenue' />
		</LoadingIndicator>
	);
	// },
};

/* Basic */
export const Basic: Story<ILoadingIndicatorProps> = (args) => {
	return (
		<LoadingIndicator {...args} isLoading>
			<BarChart
				width={750}
				data={[
					{ x: '2015-01-01', y: 1 },
					{ x: '2015-01-02', y: 2 },
					{ x: '2015-01-03', y: 3 },
					{ x: '2015-01-04', y: 5 },
				]}
			/>
		</LoadingIndicator>
	);
};

/* Custom Message */
export const CustomMessage: Story<ILoadingIndicatorProps> = (args) => {
	const {
		LoadingMessage,
		LoadingMessage: { Title, Body, Icon },
	} = LoadingIndicator;

	return (
		<div>
			<LoadingIndicator {...args} isLoading>
				<BarChart
					width={750}
					data={[
						{ x: '2015-01-01', y: 1 },
						{ x: '2015-01-02', y: 2 },
						{ x: '2015-01-03', y: 3 },
						{ x: '2015-01-04', y: 5 },
					]}
				/>
				<LoadingMessage>
					<Icon>
						<LoadingIcon speed='slow' />
					</Icon>
					<Title>Custom Title</Title>
					<Body>Custom Body</Body>
				</LoadingMessage>
			</LoadingIndicator>

			<LoadingIndicator {...args} isLoading>
				<BarChart
					width={750}
					data={[
						{ x: '2015-01-01', y: 1 },
						{ x: '2015-01-02', y: 2 },
						{ x: '2015-01-03', y: 3 },
						{ x: '2015-01-04', y: 5 },
					]}
				/>
				<LoadingMessage
					Icon={<LoadingIcon speed='fast' />}
					Title='Enhancing...'
					Body='Please wait'
				/>
			</LoadingIndicator>
		</div>
	);
};

/* No Title */
export const NoTitle: Story<ILoadingIndicatorProps> = (args) => {
	return (
		<LoadingIndicator {...args} isLoading>
			<BarChart
				width={750}
				data={[
					{ x: '2015-01-01', y: 1 },
					{ x: '2015-01-02', y: 2 },
					{ x: '2015-01-03', y: 3 },
					{ x: '2015-01-04', y: 5 },
				]}
			/>
			<LoadingIndicator.LoadingMessage Title={null} />
		</LoadingIndicator>
	);
};
NoTitle.args = {
	isLoading: true,
};
/* No Overlay */
export const NoOverlay: Story<ILoadingIndicatorProps> = (args) => {
	return (
		<LoadingIndicator {...args}>
			<BarChart
				width={750}
				data={[
					{ x: '2015-01-01', y: 1 },
					{ x: '2015-01-02', y: 2 },
					{ x: '2015-01-03', y: 3 },
					{ x: '2015-01-04', y: 5 },
				]}
			/>
		</LoadingIndicator>
	);
};
NoOverlay.args = {
	hasOverlay: false,
	isLoading: true,
};

/* Dark Overlay */
export const DarkOverlay: Story<ILoadingIndicatorProps> = (args) => {
	return (
		<LoadingIndicator {...args}>
			<BarChart
				width={750}
				data={[
					{ x: '2015-01-01', y: 1 },
					{ x: '2015-01-02', y: 2 },
					{ x: '2015-01-03', y: 3 },
					{ x: '2015-01-04', y: 5 },
				]}
			/>
		</LoadingIndicator>
	);
};
DarkOverlay.args = {
	isLoading: true,
	overlayKind: 'dark',
};
