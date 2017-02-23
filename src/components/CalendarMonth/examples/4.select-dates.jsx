import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { DateUtils } from 'react-day-picker';
import {
	CalendarMonth,
	Button,
} from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			index: 0,
			selectedDays: [],
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
			selectedDays,
		} = this.state;

		this.setState({
			selectedDays: _.xorWith(selectedDays, [date], DateUtils.isSameDay),
			cursor: date,
		});
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
			selectedDays,
			cursor,
			index,
		} = this.state;

		return (
			<section>

				<div style={{ display: 'flex' }}>
					<Button onClick={this.handlePrev}>{'<'}</Button>

					<CalendarMonth
						currentMonthIndex={index}
						selectedDays={selectedDays}
						cursor={cursor}
						onDayClick={this.handleDayClick}
						onDayMouseEnter={this.handleDayMouseEnter}
						onDayMouseLeave={this.handleDayMouseLeave}
						disabledDays={DateUtils.isPastDay}
					/>

					<Button onClick={this.handleNext}>{'>'}</Button>
				</div>

				selectedDays: {_.map(selectedDays, (selected) => moment(selected).format('MMM-DD-YYYY')).join(', ')}
			</section>
		);
	},
});
