import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarMonth');

const {
	bool,
	func,
	instanceOf,
	number,
	object,
	string,
	oneOf,
} = React.PropTypes;

/**
 * {"categories": ["helpers"]}
 *
 * A single calendar month based on `react-day-picker`.
 */
const CalendarMonth = createClass({
	displayName: 'CalendarMonth',
	_isPrivate: true,

	propTypes: {
		/**
		 * The index of the rendered month, where 0 is the `initialMonth`. Negative
		 * values will show previous months.
		 */
		currentMonthIndex: number,

		/**
		 * Sets the month of the calendar. The 0 value for the `currentMonthIndex`
		 * prop refers to this month.
		 */
		initialMonth: instanceOf(Date),

		/**
		 * Set the cursor to target date. Primarily used to preview expected ranges
		 * when the cursor is on a target date.
		 */
		cursor: instanceOf(Date),

		/**
		 * Sets the start date in a date range.
		 */
		from: instanceOf(Date),

		/**
		 * Sets the end date in a date range.
		 */
		to: instanceOf(Date),

		/**
		 * The next selection that is expected. Primarily used to preview expected
		 * ranges when the cursor is on a target date.
		 */
		selectMode: oneOf(['day', 'from', 'to']),

		/**
		 * Used to skip re-rendering of this component when true. Primarily used
		 * for CalendarMonths which are renderend out of view.
		 */
		shouldComponentUpdate: bool,
	},

	getDefaultProps() {
		return {
			currentMonthIndex: 0,
			initialMonth: new Date(),
			cursor: null,
			from: null,
			to: null,
			selectMode: 'day',
			shouldComponentUpdate: true,
		};
	},

	modifierRange(day) {
		const {
			cursor,
			from,
			to,
			selectMode,
		} = this.props;

		if (cursor) {
			if (selectMode === 'day') {
				return DateUtils.isSameDay(day, moment(cursor).toDate());
			} else if (from || to) {
				return DateUtils.isSameDay(day, moment(from).toDate()) ||
					DateUtils.isSameDay(day, moment(cursor).toDate()) ||
					DateUtils.isDayBetween(day, moment(selectMode === 'to' ? from : to).toDate(), moment(cursor).toDate());
			}
			return DateUtils.isSameDay(day, moment(cursor).toDate());
		} else {
			if (from && to) {
				return DateUtils.isSameDay(day, moment(from).toDate()) ||
					DateUtils.isSameDay(day, moment(to).toDate()) ||
					DateUtils.isDayBetween(day, moment(from).toDate(), moment(to).toDate());
			}
		}
	},

	modifierFrom(day) {
		const {
			from,
		} = this.props;

		return DateUtils.isSameDay(day, moment(from).toDate());
	},

	modifierTo(day) {
		const {
			to,
		} = this.props;

		return DateUtils.isSameDay(day, moment(to).toDate());
	},

	shouldComponentUpdate() {
		return this.props.shouldComponentUpdate;
	},

	render() {
		const {
			currentMonthIndex,
			initialMonth,
			...passThroughs
		} = this.props;

		const monthDate = moment(initialMonth).add(currentMonthIndex, 'months');

		return (
			<DayPicker
				key={currentMonthIndex}
				className={cx('&')}
				initialMonth={monthDate.toDate()}
				canChangeMonth={false}
				weekdaysShort={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
				{...passThroughs}
				modifiers={{
					range: this.modifierRange,
					from: this.modifierFrom,
					to: this.modifierTo,
					...passThroughs.modifiers
				}}
			/>
		);
	},
});

export default CalendarMonth;
