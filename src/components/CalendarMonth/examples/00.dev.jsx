import React from 'react';
import { CalendarMonth } from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			year: 2016,
			month: 11,
			selectedDate: '2017-01-20',
			hoverDate: null,
		};
	},

	handlePrevMonth() {
		const {
			year,
			month,
		} = this.state;
		const prevMonth = month - 1;

		this.setState({
			year: (prevMonth === -1 ? year - 1 : year),
			month: (prevMonth === -1 ? 11 : prevMonth),
		});
	},

	handleNextMonth() {
		const {
			year,
			month,
		} = this.state;
		const nextMonth = month + 1;

		this.setState({
			year: (nextMonth === 12 ? year + 1 : year),
			month: (nextMonth === 12 ? 0 : nextMonth),
		});
	},

	handleSelectDate(date) {
		//console.log(date.toString()); // eslint-disable-line
		this.setState({
			selectedDate: date,
		});
	},

	handleHoverDate(date) {
		this.setState({
			hoverDate: date,
		});
	},

	handleMouseOut() {
		this.setState({
			hoverDate: null,
		});
	},

	getNextMonth({year, month}) {
		const nextMonth = month + 1;

		return {
			year: (nextMonth === 12 ? year + 1 : year),
			month: (nextMonth === 12 ? 0 : nextMonth),
		};
	},

	isSelectedDay(date) {
		return date.isBetween('2016-12-12', '2016-12-16', null, '[]') ||
			date.isBetween('2016-12-26', '2016-12-30', null, '[]');
	},

	render() {
		const {
			year,
			month,
			selectedDate,
			hoverDate,
		} = this.state;

		return (
			<section>
				<button onClick={this.handlePrevMonth}>prev</button>
				<button onClick={this.handleNextMonth}>next</button>
				<div style={{display: 'flex'}}>
					<CalendarMonth
						style={{width: 240}}
						date={[year, month]}
						selectedStart='2016-12-19'
						selectedEnd={selectedDate}
						//selected={['2016-12-24', '2016-12-25']}
						//selected={this.isSelectedDay}
						//highlighted={['2016-12-24', '2016-12-25']}
						highlightedStart='2016-12-19'
						highlightedEnd={hoverDate}
						enabledStart='2016-12-2'
						enabledEnd='2017-1-2'
						//mapDate={(date) => ({
						//	isSelected: date.day() === 4,
						//	isHighlighted: false,
						//	isDisabled: false,
						//})}
						onSelectDate={this.handleSelectDate}
						onHoverDate={this.handleHoverDate}
						onMouseOut={this.handleMouseOut}
					/>
				</div>
			</section>
		);
	},
});
