import React from 'react';
import createClass from 'create-react-class';
import CalendarMonth from './CalendarMonth';
import ReactDayPicker from 'react-day-picker';
import _ from 'lodash';
import Button from '../Button/Button';

export default {
	title: 'Private/CalendarMonth',
	component: CalendarMonth,
	parameters: {
		docs: {
			description: {
				component: (CalendarMonth as any).peek.description,
			},
		},
	},
};

/* Selected Day */
export const SelectedDay = () => {
	const Component = createClass({
		render() {
			return (
				<section style={{ maxWidth: 400 }}>
					<CalendarMonth selectedDays={new Date()} />
				</section>
			);
		},
	});

	return <Component />;
};
SelectedDay.storyName = 'SelectedDay';

/* Disabled Days */
export const DisabledDays = () => {
	const Component = createClass({
		render() {
			return (
				<section style={{ maxWidth: 400 }}>
					<CalendarMonth disabledDays={ReactDayPicker.DateUtils.isPastDay} />
				</section>
			);
		},
	});

	return <Component />;
};
DisabledDays.storyName = 'DisabledDays';

/* Custom Daypicker Modifiers */
export const CustomDaypickerModifiers = () => {
	const Component = createClass({
		render() {
			return (
				<section style={{ maxWidth: 400 }}>
					<CalendarMonth
						modifiers={{
							tuesday: (day: any) => day.getDay() === 2,
						}}
					/>

					<style>{`
					.lucid-CalendarMonth .DayPicker-Day--tuesday {
						border: 1px dotted gray;
					}
				`}</style>
				</section>
			);
		},
	});

	return <Component />;
};
CustomDaypickerModifiers.storyName = 'CustomDaypickerModifiers';

/* Select Dates */
export const SelectDates = () => {
	const Component = createClass({
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

		handleDayClick(date: any, { disabled }: any) {
			if (disabled) {
				return;
			}

			const { selectedDays } = this.state;

			this.setState({
				selectedDays: _.xorWith(
					selectedDays,
					[date],
					ReactDayPicker.DateUtils.isSameDay
				),
				cursor: date,
			});
		},

		handleDayMouseEnter(day: any, { disabled }: any) {
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
							disabledDays={ReactDayPicker.DateUtils.isPastDay}
						/>

						<Button onClick={this.handleNext}>{'>'}</Button>
					</div>
					selectedDays:{' '}
					{_.map(selectedDays, (selected) =>
						selected.toLocaleDateString('en-US')
					).join(', ')}
				</section>
			);
		},
	});

	return <Component />;
};
SelectDates.storyName = 'SelectDates';

/* Select Range */
export const SelectRange = () => {
	const Component = createClass({
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

		handleDayClick(date: any, { disabled }: any) {
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

		handleDayMouseEnter(day: any, { disabled }: any) {
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
							disabledDays={ReactDayPicker.DateUtils.isPastDay}
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
							disabledDays={ReactDayPicker.DateUtils.isPastDay}
						/>

						<Button onClick={this.handleNext}>{'>'}</Button>
					</div>
					from: {from && from.toLocaleDateString('en-US')}, to:{' '}
					{to && to.toLocaleDateString('en-US')}
				</section>
			);
		},
	});

	return <Component />;
};
SelectRange.storyName = 'SelectRange';

/* Show Cursor */
export const ShowCursor = () => {
	const Component = createClass({
		UNSAFE_componentWillMount() {
			this.fromDate = new Date();
			this.fromDate.setDate(1);
		},

		render() {
			return (
				<section style={{ maxWidth: 400 }}>
					Cursor for day selectMode:
					<CalendarMonth cursor={new Date()} />
					Cursor for range selectMode:
					<CalendarMonth
						selectMode='to'
						from={this.fromDate}
						cursor={new Date()}
					/>
				</section>
			);
		},
	});

	return <Component />;
};
ShowCursor.storyName = 'ShowCursor';
