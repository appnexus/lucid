import React from 'react';
import { DatePicker } from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			selected: null,
			selectedRangeStart: null,
			selectedRangeEnd: null,
			targetDateRangeBoundary: 'start',
		};
	},

	handleSelect(date) {
		this.setState({
			selected: date.toISOString(),
		});
	},

	handleSelectRange(startDate, endDate) {
		this.setState({
			selectedRangeStart: startDate && startDate.toISOString(),
			selectedRangeEnd: endDate && endDate.toISOString(),
		});
	},

	handleTargetStartDate() {
		this.setState({
			targetDateRangeBoundary: 'start',
		});
	},

	handleTargetEndDate() {
		this.setState({
			targetDateRangeBoundary: 'end',
		});
	},

	render() {

		return (
			<section>
				<div>
					selected: {JSON.stringify(this.state.selected)}<br />
					selectedRangeStart: {JSON.stringify(this.state.selectedRangeStart)}<br />
					selectedRangeEnd: {JSON.stringify(this.state.selectedRangeEnd)}<br />
					targetDateRangeBoundary: {JSON.stringify(this.state.targetDateRangeBoundary)}<br />
				</div>
				<button onClick={this.handleTargetStartDate}>target start date</button>
				<button onClick={this.handleTargetEndDate}>target end date</button>
				<DatePicker
					style={{width: 700}}
					size={3}
					CalendarMonth={{
						showAdjacentMonthDates: false,
						showDayOfWeekLabels: false,
					}}
					//onSelect={this.handleSelect}
					isDateRange={true}
					targetDateRangeBoundary={this.state.targetDateRangeBoundary}
					onSelectRange={this.handleSelectRange}
				/>
			</section>
		);
	},
});
