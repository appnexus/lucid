import React from 'react';
import createClass from 'create-react-class';
import { DateSelect } from '../../../index';
import timemachine from 'timemachine';

timemachine.config({
	dateString: 'December 25, 2018 13:12:59',
});

export default createClass({
	getInitialState() {
		return {
			selectedDate: null,
		};
	},

	handleSelectDate(date: any) {
		this.setState({
			selectedDate: date,
		});
	},

	render() {
		const { selectedDate } = this.state;

		return (
			<section style={{ maxWidth: 800 }}>
				<DateSelect
					useSlidePanel={false}
					selectedDays={selectedDate}
					onSelectDate={this.handleSelectDate}
					monthsShown={2}
					showDivider
				/>
				selected date:{' '}
				{selectedDate && selectedDate.toLocaleDateString('en-US')}
			</section>
		);
	},
});
