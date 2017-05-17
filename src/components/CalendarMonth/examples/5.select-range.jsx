import React from 'react';
import createClass from 'create-react-class';
import { DateUtils } from 'react-day-picker';
import { Button } from '../../../index';
import CalendarMonth from '../CalendarMonth';

export default createClass({
	getInitialState() {
		return {
			offset: 0,
			selectMode: 'from',
			from: null,
			to: null,
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

		const { selectMode } = this.state;

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
		const { selectMode, from, to, cursor, offset } = this.state;

		return (
			<section>

				<div style={{ display: 'flex', maxWidth: 800 }}>
					<Button onClick={this.handlePrev}>{'<'}</Button>

					<CalendarMonth
						monthOffset={offset}
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
						monthOffset={offset + 1}
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

				from: {from && from.toLocaleDateString('en-US')},
				to: {to && to.toLocaleDateString('en-US')}
			</section>
		);
	},
});
