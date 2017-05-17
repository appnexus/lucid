import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { DateUtils } from 'react-day-picker';
import { Button } from '../../../index';
import CalendarMonth from '../CalendarMonth';

export default createClass({
	getInitialState() {
		return {
			offset: 0,
			selectedDays: [],
			cursor: null,
		};
	},

	handlePrev() {
		this.setState({
			offset: this.state.offset - 1,
		});
	},

	handleNext() {
		this.setState({
			offset: this.state.offset + 1,
		});
	},

	handleDayClick(date, { disabled }) {
		if (disabled) {
			return;
		}

		const { selectedDays } = this.state;

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
		const { selectedDays, cursor, offset } = this.state;

		return (
			<section>

				<div style={{ display: 'flex', maxWidth: 468 }}>
					<Button onClick={this.handlePrev}>{'<'}</Button>

					<CalendarMonth
						monthOffset={offset}
						selectedDays={selectedDays}
						cursor={cursor}
						onDayClick={this.handleDayClick}
						onDayMouseEnter={this.handleDayMouseEnter}
						onDayMouseLeave={this.handleDayMouseLeave}
						disabledDays={DateUtils.isPastDay}
					/>

					<Button onClick={this.handleNext}>{'>'}</Button>
				</div>

				selectedDays:
				{' '}
				{_.map(selectedDays, selected =>
					selected.toLocaleDateString('en-US')
				).join(', ')}
			</section>
		);
	},
});
