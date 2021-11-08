import React from 'react';
import createClass from 'create-react-class';
import { Button, DateSelect } from './../../index';
import timemachine from 'timemachine';

export default {
	title: 'Controls/Selectors/DateSelect',
	component: DateSelect,
	parameters: {
		docs: {
			description: {
				component: (DateSelect as any).peek.description,
			},
		},
	},
};

/* Select Date */
export const SelectDate = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	const Component = createClass({
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
				<section style={{ maxWidth: 400 }}>
					<DateSelect
						selectedDays={selectedDate}
						onSelectDate={this.handleSelectDate}
					/>
					selected date:{' '}
					{selectedDate && selectedDate.toLocaleDateString('en-US')}
				</section>
			);
		},
	});

	return <Component />;
};
SelectDate.storyName = 'SelectDate';

/* Select Range */
export const SelectRange = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	const Component = createClass({
		getInitialState() {
			return {
				selectMode: 'from',
				from: null,
				to: null,
			};
		},

		handleSelectDate(date: any) {
			const { selectMode } = this.state;

			this.setState({
				selectMode: 'to',
				[selectMode]: date,
			});
		},

		handleReset() {
			this.setState({
				selectMode: 'from',
				from: null,
				to: null,
			});
		},

		render() {
			const { selectMode, from, to } = this.state;

			return (
				<section style={{ maxWidth: 400 }}>
					<DateSelect
						from={from}
						to={to}
						selectMode={selectMode}
						onSelectDate={this.handleSelectDate}
					/>

					<div>
						from: {from && from.toLocaleDateString('en-US')}, to:{' '}
						{to && to.toLocaleDateString('en-US')}
					</div>

					<Button onClick={this.handleReset}>Reset</Button>
				</section>
			);
		},
	});

	return <Component />;
};
SelectRange.storyName = 'SelectRange';

/* Disabled Days */
export const DisabledDays = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	function isPastDay(date: any) {
		const day = new Date(date.getTime()).setHours(0, 0, 0, 0);
		const today = new Date().setHours(0, 0, 0, 0);
		return day < today;
	}

	const Component = createClass({
		render() {
			return (
				<section style={{ maxWidth: 400 }}>
					<DateSelect disabledDays={isPastDay} />
				</section>
			);
		},
	});

	return <Component />;
};
DisabledDays.storyName = 'DisabledDays';

/* Initial Month */
export const InitialMonth = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	const Component = createClass({
		render() {
			return (
				<section style={{ maxWidth: 400 }}>
					<DateSelect
						initialMonth={new Date(2016, 1)}
						selectedDays={new Date(2016, 1, 17) as any}
					/>
				</section>
			);
		},
	});

	return <Component />;
};
InitialMonth.storyName = 'InitialMonth';

/* Mutiple Months */
export const MutipleMonths = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	const Component = createClass({
		render() {
			return (
				<DateSelect
					selectedDays={new Date() as any}
					monthsShown={3}
					calendarsRendered={9}
					showDivider
				/>
			);
		},
	});

	return <Component />;
};
MutipleMonths.storyName = 'MutipleMonths';

/* Custom Modifiers */
export const CustomModifiers = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	const Component = createClass({
		render() {
			return (
				<section style={{ maxWidth: 400 }}>
					<DateSelect>
						<DateSelect.CalendarMonth
							modifiers={
								{
									tuesday: (date: any) => date.getDay() === 2,
								} as any
							}
						/>
					</DateSelect>

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
CustomModifiers.storyName = 'CustomModifiers';

/* Relative Font Size */
export const RelativeFontSize = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	const Component = createClass({
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
					selected date:{' '}
					{selectedDate && selectedDate.toLocaleDateString('en-US')}
				</section>
			);
		},
	});

	return <Component />;
};
RelativeFontSize.storyName = 'RelativeFontSize';

/* Disable Slide Panel */
export const DisableSlidePanel = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	const Component = createClass({
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

	return <Component />;
};
DisableSlidePanel.storyName = 'DisableSlidePanel';
