import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

const { DateUtils } = DayPicker;

const cx = lucidClassNames.bind('&-CalendarMonth');

const { bool, instanceOf, number, oneOf, string } = PropTypes;

export interface ICalendarProps extends StandardProps {
	/** The offset of the rendered month, where 0 is the \`initialMonth\`.
	 * Negative values will show previous months.
	 */
	monthOffset: number;

	/**Sets the month of the calendar. The 0 value for the \`monthOffset\` prop
	 * refers to this month.
	 */
	initialMonth: Date;

	/** Set the cursor to target date. Primarily used to preview expected ranges
	 * when the cursor is on a target date.
	 */
	cursor: Date | null;

	/** Sets the start date in a date range.
	 */
	from?: Date | null;

	/** Sets the end date in a date range.
	 */
	to?: Date | null;

	/** The next selection that is expected. Primarily used to preview expected
	 * ranges when the cursor is on a target date.
	 */
	selectMode: 'day' | 'from' | 'to';

	/** Used to skip re-rendering of this component when true. Primarily used for
	 * CalendarMonths which are rendered out of view.
	 */
	shouldComponentUpdate: boolean;

	/** These are values that we've allowed our API to accept, which will go directly
	 * into the `modifers` object that we pass to DayPicker.
	 */
	modifiers?: any;

	/** Sets selected days. Passed through to \`CalendarMonth\` ->
			\`react-day-picker\`. */
	selectedDays?: Date | ((date: Date) => boolean | Date | Date[]) | null;

	/** Sets disabled days. Passed through to \`CalendarMonth\` ->
			\`react-day-picker\`.*/
	disabledDays?: (date: Date) => boolean | Date | Date[];

	/** Highlight dates and ranges based on cursor position. */
	showCursorHighlight?: boolean;

	key?: string | number;

	onDayClick?: (
		day: Date,
		{ disabled }: { disabled: boolean },
		event: React.MouseEvent
	) => void;

	onDayMouseEnter?: (day: Date, { disabled }: { disabled: boolean }) => void;

	onDayMouseLeave?: () => void;
}

class CalendarMonth extends React.Component<ICalendarProps, {}, {}> {
	static _isPrivate = true;
	static displayName = 'CalendarMonth';
	static peek = {
		description: `A single calendar month based on \`react-day-picker\`.`,
		categories: ['helpers'],
	};
	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			The offset of the rendered month, where 0 is the \`initialMonth\`.
			Negative values will show previous months.
		*/
		monthOffset: number,

		/**
			Sets the month of the calendar. The 0 value for the \`monthOffset\` prop
			refers to this month.
		*/
		initialMonth: instanceOf(Date),

		/**
			Set the cursor to target date. Primarily used to preview expected ranges
			when the cursor is on a target date.
		*/
		cursor: instanceOf(Date),

		/**
			Sets the start date in a date range.
		*/
		from: instanceOf(Date),

		/**
			Sets the end date in a date range.
		*/
		to: instanceOf(Date),

		/**
			The next selection that is expected. Primarily used to preview expected
			ranges when the cursor is on a target date.
		*/
		selectMode: oneOf(['day', 'from', 'to']),

		/**
			Used to skip re-rendering of this component when true. Primarily used for
			CalendarMonths which are rendered out of view.
		*/
		shouldComponentUpdate: bool,
	};

	static defaultProps = {
		monthOffset: 0,
		initialMonth: new Date(),
		cursor: null,
		from: null,
		to: null,
		selectMode: 'day',
		shouldComponentUpdate: true,
	};

	modifierRange = (day: Date): boolean => {
		const { cursor, from, to, selectMode } = this.props;

		if (cursor) {
			if (selectMode === 'day') {
				return DateUtils.isSameDay(day, new Date(cursor));
			} else if (from || to) {
				return DateUtils.isDayInRange(day, {
					from: new Date(selectMode === 'to' ? (from as Date) : (to as Date)),
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
	};

	modifierFrom = (day: Date): boolean => {
		const { from } = this.props;

		return DateUtils.isSameDay(day, new Date(from as Date));
	};

	modifierTo = (day: Date): boolean => {
		const { to } = this.props;

		return DateUtils.isSameDay(day, new Date(to as Date));
	};

	shouldComponentUpdate(): boolean {
		return this.props.shouldComponentUpdate as boolean;
	}

	render(): React.ReactNode {
		const { className, monthOffset, initialMonth, ...passThroughs } =
			this.props;

		// It can be tricky to increment months using JavaScript dates, this should
		// handle the edge cases.
		// http://stackoverflow.com/questions/499838/javascript-date-next-month
		const monthDate = new Date(
			(initialMonth as Date).getFullYear(),
			(initialMonth as Date).getMonth() + (monthOffset as number),
			1
		);

		return (
			/**typescript boundary with this component is tricky to get right with the way passthrough works
			 * the component is being rewritten in typescript.  Going to punt on this for now
			 * https://github.com/gpbl/react-day-picker/issues/942
			 */
			//@ts-ignore
			<DayPicker
				key={monthOffset}
				className={cx('&', className)}
				initialMonth={monthDate}
				canChangeMonth={false}
				weekdaysShort={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
				{...(passThroughs as any)}
				modifiers={{
					range: this.modifierRange,
					from: this.modifierFrom,
					to: this.modifierTo,
					...passThroughs.modifiers,
				}}
			/>
		);
	}
}

export default CalendarMonth;
