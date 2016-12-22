import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import Button from '../Button/Button';
import * as reducers from './DatePicker.reducers';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps, getFirst } from '../../util/component-types';

const cx = lucidClassNames.bind('&-DatePicker');

const {
	any,
	bool,
	func,
	number,
	oneOf,
	string,
} = React.PropTypes;


/**
 * {"categories": ["helpers"]}
 *
 * DatePicker is used to wrap content to better organize elements in window.
 */
const DatePicker = createClass({
	displayName: 'DatePicker',

	components: {
		CalendarMonth: createClass({
			displayName: 'DatePicker.CalendarMonth',
			propName: 'CalendarMonth',
		}),
	},
	reducers,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/** date */
		date: any,
		/** size */
		size: number,
		/** maxMonthWidth */
		maxMonthWidth: number,
		/** hasStretchedMonths */
		hasStretchedMonths: bool,
		/** selected */
		selected: any,
		/** selectedStart */
		selectedStart: any,
		/** selectedEnd */
		selectedEnd: any,
		/** highlighted */
		highlighted: any,
		/** highlightedStart */
		highlightedStart: any,
		/** highlightedEnd */
		highlightedEnd: any,
		/** enabledStart */
		enabledStart: any,
		/** enabledEnd */
		enabledEnd: any,
		/** isDateRange */
		isDateRange: bool,
		/** targetDateRangeBoundary */
		targetDateRangeBoundary: oneOf(['start', 'end']),
		/** onPrevMonth */
		onPrevMonth: func,
		/** onNextMonth */
		onNextMonth: func,
		/** onSelect */
		onSelect: func,
		/** onSelectRange */
		onSelectRange: func,
	},

	getDefaultProps() {
		return {
			className: null,
			date: moment(),
			size: 1,
			maxMonthWidth: 3,
			hasStretchedMonths: true,
			selected: null,
			selectedStart: null,
			selectedEnd: null,
			highlighted: null,
			highlightedStart: null,
			highlightedEnd: null,
			enabledStart: null,
			enabledEnd: null,
			isDateRange: false,
			targetDateRangeBoundary: null,
			onPrevMonth: _.noop,
			onNextMonth: _.noop,
			onSelect: _.noop,
			onSelectRange: _.noop,
		};
	},

	handleCalendarMonthSelect(date) {
		const {
			isDateRange,
			selectedStart,
			selectedEnd,
			targetDateRangeBoundary,
			onSelect,
			onSelectRange,
		} = this.props;

		if (isDateRange) {
			const selectedStartDate = selectedStart ? moment(selectedStart) : null;
			const selectedEndDate = selectedEnd ? moment(selectedEnd) : null;

			if (targetDateRangeBoundary === 'start') {
				onSelectRange(date, selectedEndDate);
			} else if (targetDateRangeBoundary === 'end') {
				onSelectRange(selectedStartDate, date);
			} else {
				// warning: you should specify a `targetDateRangeBoundary` to get the correct seleted date range
				onSelectRange(date, date);
			}
		} else {
			onSelect(date);
		}
	},

	render: function() {
		const {
			className,
			date,
			size,
			maxMonthWidth,
			hasStretchedMonths,
			selected,
			selectedStart,
			selectedEnd,
			highlighted,
			highlightedStart,
			highlightedEnd,
			enabledStart,
			enabledEnd,
			onPrevMonth,
			onNextMonth,
			...passThroughs
		} = this.props;

		const calendarMonth = getFirst(this.props, DatePicker.CalendarMonth, <DatePicker.CalendarMonth />);
		const calendarMonthWidth = _.get(calendarMonth, ['props', 'style', 'width'], `${100 / maxMonthWidth}%`);

		return (
			<div
				{...omitProps(passThroughs, DatePicker)}
				className={cx('&', {
					'&-has-stretched-months': hasStretchedMonths,
				}, className)}
			>
				{_.times(size, (calendarMonthIndex) => {
					const calendarMonthDate = moment(date).add({months: calendarMonthIndex});
					return (
						<div className={cx('&-month')} key={calendarMonthIndex} style={{
							flexBasis: calendarMonthWidth,
						}}>
							<div className={cx('&-month-header')}>
								<Button className={cx('&-Button-prev-month')} size='small' kind='primary' onClick={onPrevMonth}><CaretIcon direction='left' /></Button>
								<span className={cx('&-month-name')}>
									{calendarMonthDate.format('MMMM YYYY')}
								</span>
								<Button className={cx('&-Button-next-month')} size='small' kind='primary' onClick={onNextMonth}><CaretIcon direction='right' /></Button>
							</div>
							<CalendarMonth
								{...calendarMonth.props}
								style={{
									..._.omit(calendarMonth.props.style, 'width'),
								}}
								date={calendarMonthDate}
								onSelectDate={this.handleCalendarMonthSelect}
								selected={selected}
								selectedStart={selectedStart}
								selectedEnd={selectedEnd}
								highlighted={highlighted}
								highlightedStart={highlightedStart}
								highlightedEnd={highlightedEnd}
								enabledStart={enabledStart}
								enabledEnd={enabledEnd}
							/>
						</div>
					);
				})}
			</div>
		);
	},
});

export default DatePicker;
