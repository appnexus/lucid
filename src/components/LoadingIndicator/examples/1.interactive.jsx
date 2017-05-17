import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { BarChart, Button, LoadingIndicator } from '../../../index';

const dates = ['2015-01-01', '2015-01-02', '2015-01-03', '2015-01-04'];
const getData = () => _.map(dates, date => ({ x: date, y: _.random(1, 5) }));

export default createClass({
	getInitialState: () => ({
		isLoading: true,
		data: _.map(dates, date => ({ x: date, y: 0 })),
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
				<Button onClick={this.handleKindClick}>
					Switch overlay color
				</Button>
				<BarChart data={data} yAxisTitle="Revenue" />
			</LoadingIndicator>
		);
	},
});
