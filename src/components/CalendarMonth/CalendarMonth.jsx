import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarMonth');

const {
	bool,
	instanceOf,
	number,
	oneOf,
	string,
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
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * The offset of the rendered month, where 0 is the `initialMonth`. Negative
		 * values will show previous months.
		 */
		monthOffset: number,

		/**
		 * Sets the month of the calendar. The 0 value for the `monthOffset`
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
		 * for CalendarMonths which are rendered out of view.
		 */
		shouldComponentUpdate: bool,
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
		const {
			cursor,
			from,
			to,
			selectMode,
		} = this.props;

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

		return DateUtils.isDayInRange(day, {
			from: new Date(from),
			to: new Date(to),
		});
	},

	modifierFrom(day) {
		const {
			from,
		} = this.props;

		return DateUtils.isSameDay(day, new Date(from));
	},

	modifierTo(day) {
		const {
			to,
		} = this.props;

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

		const monthDate = new Date(initialMonth);
		monthDate.setMonth(monthDate.getMonth() + monthOffset);

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
