import React from 'react';
import createClass from 'create-react-class';
import { DateSelect } from '../../../index';

export default createClass({
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
