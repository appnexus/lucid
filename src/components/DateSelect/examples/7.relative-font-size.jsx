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
			<section>

				<DateSelect
					isFontSizeRelative
					style={{
						width: 600,
						height: 400,
					}}
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
