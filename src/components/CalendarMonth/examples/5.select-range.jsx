import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import {
	CalendarMonth,
	Button,
} from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			index: 0,
			selectMode: 'from',
			from: null,
			to: null,
			cursor: null,
		};
	},

	handlePrev() {
		this.setState({
			index: this.state.index - 1,
		});
	},

	handleNext() {
		this.setState({
			index: this.state.index + 1,
		});
	},

	handleDayClick(date, { disabled }) {
		if (disabled) {
			return;
		}

		const {
			selectMode,
		} = this.state;

		if (selectMode === 'to') {
			this.setState({
				to: date,
				cursor: date,
			});
		} else {
			this.setState({
				from: date,
				selectMode: 'to',
				cursor: date,
			});
		}
	},

	handleDayMouseEnter(day, { disabled }) {
		if (disabled) {
			this.setState({
				cursor: null,
			});
		} else {
			this.setState({
				cursor: day,
			});
		}
	},

	handleDayMouseLeave() {
		this.setState({
			cursor: null,
		});
	},

	render() {
		const {
			selectMode,
			from,
			to,
			cursor,
			index,
		} = this.state;

		return (
			<section>

				<div style={{ display: 'flex' }}>
					<Button onClick={this.handlePrev}>{'<'}</Button>

					<CalendarMonth
						currentMonthIndex={index}
						selectMode={selectMode}
						from={from}
						to={to}
						cursor={cursor}
						onDayClick={this.handleDayClick}
						onDayMouseEnter={this.handleDayMouseEnter}
						onDayMouseLeave={this.handleDayMouseLeave}
						disabledDays={DateUtils.isPastDay}
					/>

					<CalendarMonth
						currentMonthIndex={index + 1}
						selectMode={selectMode}
						from={from}
						to={to}
						cursor={cursor}
						onDayClick={this.handleDayClick}
						onDayMouseEnter={this.handleDayMouseEnter}
						onDayMouseLeave={this.handleDayMouseLeave}
						disabledDays={DateUtils.isPastDay}
					/>

					<Button onClick={this.handleNext}>{'>'}</Button>
				</div>

				from: {moment(this.state.from).format('MMM-DD-YYYY')},
				to: {moment(this.state.to).format('MMM-DD-YYYY')}
			</section>
		);
	},
});
