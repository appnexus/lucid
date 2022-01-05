import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
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
				component: (LoadingIndicator as any).peek.description,
			},
		},
	},
};

/* Interactive */
export const Interactive = () => {
	const dates = ['2015-01-01', '2015-01-02', '2015-01-03', '2015-01-04'];
	const getData = () =>
		_.map(dates, (date) => ({ x: date, y: _.random(1, 5) }));

	const Component = createClass({
		getInitialState: () => ({
			isLoading: true,
			data: _.map(dates, (date) => ({ x: date, y: 0 })),
			overlayKind: 'dark',
		}),

		handleKindClick() {
			this.setState({
				overlayKind: this.state.overlayKind === 'dark' ? 'light' : 'dark',
			});
		},

		componentDidMount() {
			setTimeout(
				() => this.setState({ isLoading: false, data: getData() }),
				1000
			);
		},

		render() {
			const { data, isLoading } = this.state;

			return (
				<LoadingIndicator
					isLoading={isLoading}
					overlayKind={this.state.overlayKind}
				>
					<Button
						style={{ margin: 10 }}
						onClick={() => {
							this.setState({ isLoading: true });
							setTimeout(
								() => this.setState({ isLoading: false, data: getData() }),
								2000
							);
						}}
					>
						Get more data
					</Button>
					<Button onClick={this.handleKindClick}>Switch overlay color</Button>
					<BarChart width={750} data={data} yAxisTitle='Revenue' />
				</LoadingIndicator>
			);
		},
	});

	return <Component />;
};
Interactive.storyName = 'Interactive';

/* Default */
export const Default = () => {
	const Component = createClass({
		render() {
			return (
				<LoadingIndicator isLoading>
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
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Custom Message */
export const CustomMessage = () => {
	const {
		LoadingMessage,
		LoadingMessage: { Title, Body, Icon },
	} = LoadingIndicator;

	const Component = createClass({
		render() {
			return (
				<div>
					<LoadingIndicator isLoading>
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

					<LoadingIndicator isLoading>
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
		},
	});

	return <Component />;
};
CustomMessage.storyName = 'CustomMessage';

/* No Title */
export const NoTitle = () => {
	const Component = createClass({
		render() {
			return (
				<LoadingIndicator isLoading>
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
		},
	});

	return <Component />;
};
NoTitle.storyName = 'NoTitle';

/* No Overlay */
export const NoOverlay = () => {
	const Component = createClass({
		render() {
			return (
				<LoadingIndicator hasOverlay={false} isLoading>
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
		},
	});

	return <Component />;
};
NoOverlay.storyName = 'NoOverlay';

/* Light Overlay */
export const LightOverlay = () => {
	const Component = createClass({
		render() {
			return (
				<LoadingIndicator isLoading overlayKind='light'>
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
		},
	});

	return <Component />;
};
LightOverlay.storyName = 'LightOverlay';
