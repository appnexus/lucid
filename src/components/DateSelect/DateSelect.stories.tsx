import React from 'react';
import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';
import timemachine from 'timemachine';

import DateSelect, { IDateSelectProps } from './DateSelect';
import Button from '../Button/Button';

export default {
	title: 'Controls/DateSelect',
	component: DateSelect,
	subcomponents: { 'DateSelect.CalendarMonth': DateSelect.CalendarMonth },
	parameters: {
		docs: {
			description: {
				component: DateSelect.peek.description,
			},
		},
		layout: 'centered',
	},
	args: DateSelect.defaultProps,
} as Meta;

export const Basic: Story<IDateSelectProps> = (args) => {
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
						{...args}
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

/* Select Range */
export const SelectRange: Story<IDateSelectProps> = () => {
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

					<Button kind='primary' onClick={this.handleReset}>
						Reset
					</Button>
				</section>
			);
		},
	});

	return <Component />;
};

/* Disabled Days */
export const DisabledDays: Story<IDateSelectProps> = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	function isPastDay(date: any) {
		const day = new Date(date.getTime()).setHours(0, 0, 0, 0);
		const today = new Date().setHours(0, 0, 0, 0);
		return day < today;
	}

	return (
		<section style={{ maxWidth: 400 }}>
			<DateSelect disabledDays={isPastDay} />
		</section>
	);
};

/* Initial Month */
export const InitialMonth: Story<IDateSelectProps> = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	return (
		<section style={{ maxWidth: 400 }}>
			<DateSelect
				initialMonth={new Date(2016, 1)}
				selectedDays={new Date(2016, 1, 17) as any}
			/>
		</section>
	);
};

/* Mutiple Months */
export const MutipleMonths: Story<IDateSelectProps> = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

	return (
		<DateSelect
			selectedDays={new Date() as any}
			monthsShown={3}
			calendarsRendered={9}
			showDivider
		/>
	);
};
MutipleMonths.parameters = {
	layout: 'padded',
};

/* Custom Modifiers */
export const CustomModifiers: Story<IDateSelectProps> = () => {
	timemachine.config({
		dateString: 'December 25, 2018 13:12:59',
	});

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
};

/* Relative Font Size */
export const RelativeFontSize: Story<IDateSelectProps> = () => {
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

/* Disable Slide Panel */
export const DisableSlidePanel: Story<IDateSelectProps> = () => {
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
