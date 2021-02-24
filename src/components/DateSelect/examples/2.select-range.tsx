import React from 'react';
import createClass from 'create-react-class';
import { Button, DateSelect } from '../../../index';
import timemachine from 'timemachine';

timemachine.config({
	dateString: 'December 25, 2018 13:12:59',
});

export default createClass({
	getInitialState() {
		return {
			selectMode: 'from',
			from: null,
			to: null,
		};
	},

	handleSelectDate(date: any) {
		const { selectMode } = this.state;

		this.setState({
			selectMode: 'to',
			[selectMode]: date,
		});
	},

	handleReset() {
		this.setState({
			selectMode: 'from',
			from: null,
			to: null,
		});
	},

	render() {
		const { selectMode, from, to } = this.state;

		return (
			<section style={{ maxWidth: 400 }}>
				<DateSelect
					from={from}
					to={to}
					selectMode={selectMode}
					onSelectDate={this.handleSelectDate}
				/>

				<div>
					from: {from && from.toLocaleDateString('en-US')}, to:{' '}
					{to && to.toLocaleDateString('en-US')}
				</div>

				<Button onClick={this.handleReset}>Reset</Button>
			</section>
		);
	},
});
