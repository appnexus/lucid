import React from 'react';
import createReactClass from 'create-react-class';
import { DateSelect } from '../../../index';

export default createReactClass({
	getInitialState() {
		return {
			selectedDate: null,
		};
	},

	handleSelectDate(date) {
		this.setState({
			selectedDate: date,
		});
	},

	render() {
		const { selectedDate } = this.state;

		return (
			<section style={{ maxWidth: 400 }}>

				<DateSelect
					selectedDays={selectedDate}
					onSelectDate={this.handleSelectDate}
				/>

				selected date:
				{' '}
				{selectedDate && selectedDate.toLocaleDateString('en-US')}

			</section>
		);
	},
});
