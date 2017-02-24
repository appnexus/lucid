import React from 'react';
import moment from 'moment';
import {
	Button,
	DateSelect,
} from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			selectMode: 'from',
			from: null,
			to: null,
		};
	},

	handleSelectDate(date) {
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
		const {
			selectMode,
			from,
			to,
		} = this.state;
		return (
			<section style={{ maxWidth: 400 }}>
				<DateSelect
					from={from}
					to={to}
					selectMode={selectMode}
					onSelectDate={this.handleSelectDate}
				/>

				<div>
					from: {moment(from).format('MMM-DD-YYYY')},
					to: {moment(to).format('MMM-DD-YYYY')}
				</div>

				<Button onClick={this.handleReset}>Reset</Button>
			</section>
		);
	},
});
