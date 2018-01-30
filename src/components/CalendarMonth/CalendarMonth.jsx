import React from 'react';
import PropTypes from 'react-peek/prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarMonth');

const { bool, instanceOf, number, oneOf, string } = PropTypes;

const CalendarMonth = createClass({
	displayName: 'CalendarMonth',

	statics: {
		peek: {
			description: `
				A single calendar month based on \`react-day-picker\`.
			`,
			categories: ['helpers'],
		},
	},

	_isPrivate: true,

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		monthOffset: number`
			The offset of the rendered month, where 0 is the \`initialMonth\`.
			Negative values will show previous months.
		`,

		initialMonth: instanceOf(Date)`
			Sets the month of the calendar. The 0 value for the \`monthOffset\` prop
			refers to this month.
		`,

		cursor: instanceOf(Date)`
			Set the cursor to target date. Primarily used to preview expected ranges
			when the cursor is on a target date.
		`,

		from: instanceOf(Date)`
			Sets the start date in a date range.
		`,

		to: instanceOf(Date)`
			Sets the end date in a date range.
		`,

		selectMode: oneOf(['day', 'from', 'to'])`
			The next selection that is expected. Primarily used to preview expected
			ranges when the cursor is on a target date.
		`,

		shouldComponentUpdate: bool`
			Used to skip re-rendering of this component when true. Primarily used for
			CalendarMonths which are rendered out of view.
		`,
	},

	getDefaultProps() {
		return {
			monthOffset: 0,
			initialMonth: new Date(),
			cursor: null,
			from: null,
			to: null,
			selectMode: 'day',
			shouldComponentUpdate: true,
		};
	},

	modifierRange(day) {
		const { cursor, from, to, selectMode } = this.props;

		if (cursor) {
			if (selectMode === 'day') {
				return DateUtils.isSameDay(day, new Date(cursor));
			} else if (from || to) {
				return DateUtils.isDayInRange(day, {
					from: new Date(selectMode === 'to' ? from : to),
					to: new Date(cursor),
				});
			}
			return DateUtils.isSameDay(day, new Date(cursor));
		}

		if (from && to) {
			return DateUtils.isDayInRange(day, {
				from: new Date(from),
				to: new Date(to),
			});
		}

		return false;
	},

	modifierFrom(day) {
		const { from } = this.props;

		return DateUtils.isSameDay(day, new Date(from));
	},

	modifierTo(day) {
		const { to } = this.props;

		return DateUtils.isSameDay(day, new Date(to));
	},

	shouldComponentUpdate() {
		return this.props.shouldComponentUpdate;
	},

	render() {
		const {
			className,
			monthOffset,
			initialMonth,
			...passThroughs
		} = this.props;

		// It can be tricky to increment months using JavaScript dates, this should
		// handle the edge cases.
		// http://stackoverflow.com/questions/499838/javascript-date-next-month
		const monthDate = new Date(
			initialMonth.getFullYear(),
			initialMonth.getMonth() + monthOffset,
			1
		);

		return (
			<DayPicker
				key={monthOffset}
				className={cx('&', className)}
				initialMonth={monthDate}
				canChangeMonth={false}
				weekdaysShort={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
				{...passThroughs}
				modifiers={{
					range: this.modifierRange,
					from: this.modifierFrom,
					to: this.modifierTo,
					...passThroughs.modifiers,
				}}
			/>
		);
	},
});

export default CalendarMonth;
