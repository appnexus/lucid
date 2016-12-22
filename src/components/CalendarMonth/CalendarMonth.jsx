import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarMonth');

const {
	any,
	bool,
	func,
	object,
	string,
} = React.PropTypes;

const MAX_DATE = new Date(8640000000000000);
const MIN_DATE = new Date(-8640000000000000);

const defaultMapDate = (calendarDay, props) => {
	const {
		selected,
		selectedStart,
		selectedEnd,
		highlighted,
		highlightedStart,
		highlightedEnd,
		enabledStart,
		enabledEnd,
	} = props;

	let selectedDates = [];
	if (!_.isNil(selected)) {
		selectedDates = _.map(_.castArray(selected), (date) => (moment(date)));
	}
	const selectedRangeStart = selectedStart && moment(selectedStart).startOf('day');
	const selectedRangeEnd = selectedEnd && moment(selectedEnd).startOf('day');
	const hasSelectedDateRange = !_.isNil(selectedRangeStart) && !_.isNil(selectedRangeEnd);

	let highlightedDates = [];
	if (!_.isNil(highlighted)) {
		highlightedDates = _.map(_.castArray(highlighted), (date) => (moment(date)));
	}
	const highlightedRangeStart = highlightedStart && moment(highlightedStart).startOf('day');
	const highlightedRangeEnd = highlightedEnd && moment(highlightedEnd).startOf('day');
	const hasHighlightedDateRange = !_.isNil(highlightedRangeStart) && !_.isNil(highlightedRangeEnd);

	const enabledRangeStart = enabledStart && moment(enabledStart).startOf('day');
	const enabledRangeEnd = enabledEnd && moment(enabledEnd).startOf('day');
	const hasEnabledDateRange = !_.isNil(enabledRangeStart) && !_.isNil(enabledRangeEnd);

	return {
		isSelected: _.some(selectedDates, (selectedDate) => (selectedDate.startOf('day').isSame(calendarDay))) || hasSelectedDateRange && calendarDay.isBetween(selectedRangeStart, selectedRangeEnd, null, '[]'),
		isHighlighted: _.some(highlightedDates, (highlightedDate) => (highlightedDate.startOf('day').isSame(calendarDay))) || hasHighlightedDateRange && calendarDay.isBetween(highlightedRangeStart, highlightedRangeEnd, null, '[]'),
		isDisabled: hasEnabledDateRange && (calendarDay.isBefore(enabledRangeStart) || calendarDay.isAfter(enabledRangeEnd.endOf('day'))),
		isEndPoint: calendarDay.isSame(selectedRangeStart) || calendarDay.isSame(selectedRangeEnd),
	};
};

/**
 * {"categories": ["helpers"]}
 *
 * CalendarMonth is used to wrap content to better organize elements in window.
 */
const CalendarMonth = createClass({
	displayName: 'CalendarMonth',

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/** style */
		style: object,
		/** date */
		date: any,
		/** mapDate */
		mapDate: func,
		/** selectedStart */
		selectedStart: any,
		/** selectedEnd */
		selectedEnd: any,
		/** selected */
		selected: any,
		/** highlightedStart */
		highlightedStart: any,
		/** highlightedEnd */
		highlightedEnd: any,
		/** highlighted */
		highlighted: any,
		/** enabledStart */
		enabledStart: any,
		/** enabledEnd */
		enabledEnd: any,
		/** showAdjacentMonthDates */
		showAdjacentMonthDates: bool,
		/** showDayOfWeekLabels */
		showDayOfWeekLabels: bool,
		/** onSelectDate */
		onSelectDate: func,
		/** onHoverDate */
		onHoverDate: func,
	},

	getDefaultProps() {
		return {
			className: null,
			style: null,
			date: moment(),
			mapDate: defaultMapDate,
			selectedStart: null,
			selectedEnd: null,
			selected: [],
			highlightedStart: null,
			highlightedEnd: null,
			highlighted: null,
			enabledStart: null,
			enabledEnd: null,
			showAdjacentMonthDates: true,
			showDayOfWeekLabels: true,
			onSelectDate: _.noop,
			onHoverDate: _.noop,
		};
	},

	statics: {
		defaultMapDate,
		MAX_DATE,
		MIN_DATE,
	},

	handleSelectDay(calendarDay) {
		return () => {
			this.props.onSelectDate(moment(calendarDay));
		};
	},

	handleHoverDay(calendarDay) {
		return () => {
			this.props.onHoverDate(moment(calendarDay));
		};
	},

	render: function() {
		const {
			className,
			style,
			date,
			mapDate,
			showAdjacentMonthDates,
			showDayOfWeekLabels,
			...passThroughs
		} = this.props;

		const targetDate = moment(date);
		const startOfMonth = moment(targetDate).startOf('month');
		const endOfMonth = moment(targetDate).endOf('month');
		const startDay = moment(startOfMonth).weekday(0);
		const weeks = endOfMonth.weeks() - startDay.weeks() + 1;
		const fixedWeeks = (weeks < 0 ? weeks + targetDate.weeksInYear() : weeks);

		const todaysDate = moment().startOf('day');

		return (
			<div
				{...omitProps(passThroughs, CalendarMonth)}
				className={cx('&', {
					'&-show-adjacent-month-dates': showAdjacentMonthDates,
				}, className)}
				style={style}
			>
				{showDayOfWeekLabels ? (
					<div className={cx('&-day-of-week-labels')}>
						<div className={cx('&-day-of-week')}>SUN</div>
						<div className={cx('&-day-of-week')}>MON</div>
						<div className={cx('&-day-of-week')}>TUE</div>
						<div className={cx('&-day-of-week')}>WED</div>
						<div className={cx('&-day-of-week')}>THU</div>
						<div className={cx('&-day-of-week')}>FRI</div>
						<div className={cx('&-day-of-week')}>SAT</div>
					</div>
				) : null}
				{_.times(fixedWeeks, (weekN) => (
					<div key={weekN} className={cx('&-week')}>
						{_.times(7, (dayOfWeek) => {
							const calendarDay = moment(startDay).add(weekN, 'weeks').weekday(dayOfWeek);
							const dayProperties = mapDate(calendarDay, this.props);
							return (
								<div
									key={dayOfWeek}
									className={cx('&-day', {
										'&-day-in-month': calendarDay.isBetween(startOfMonth, endOfMonth, null, '[]'),
										'&-day-is-today': calendarDay.isSame(todaysDate),
										'&-day-is-selected': dayProperties.isSelected,
										'&-day-is-highlighted': dayProperties.isHighlighted,
										'&-day-is-disabled': dayProperties.isDisabled,
										'&-day-is-endpoint': dayProperties.isEndPoint,
									})}
									onClick={dayProperties.isDisabled ? _.noop : this.handleSelectDay(calendarDay)}
									onMouseOver={dayProperties.isDisabled ? _.noop : this.handleHoverDay(calendarDay)}
								>
									{calendarDay.date()}
								</div>
							);
						})}
					</div>
				))}
			</div>
		);
	},
});

export default CalendarMonth;
