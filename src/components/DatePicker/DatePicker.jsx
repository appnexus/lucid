import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import Button from '../Button/Button';
import * as reducers from './DatePicker.reducers';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-DatePicker');

const {
	any,
	func,
	object,
	string,
} = React.PropTypes;


/**
 * {"categories": ["helpers"]}
 *
 * DatePicker is used to wrap content to better organize elements in window.
 */
const DatePicker = createClass({
	displayName: 'DatePicker',

	reducers,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/** style */
		style: object,
		/** date */
		date: any,
		/** selectedDate */
		selectedDate: any,
		/** selectedStart */
		selectedStart: any,
		/** selectedEnd */
		selectedEnd: any,
		/** enabledStart */
		enabledStart: any,
		/** enabledEnd */
		enabledEnd: any,
		/** onPrevMonth */
		onPrevMonth: func,
		/** onNextMonth */
		onNextMonth: func,
		/** onSelect */
		onSelect: func,
	},

	getDefaultProps() {
		return {
			className: null,
			style: null,
			date: moment(),
			selectedDate: null,
			selectedStart: null,
			enabledStart: null,
			enabledEnd: null,
			selectedEnd: null,
			onPrevMonth: _.noop,
			onNextMonth: _.noop,
			onSelect: _.noop,
		};
	},

	render: function() {
		const {
			className,
			style,
			date,
			selectedDate,
			selectedStart,
			selectedEnd,
			enabledStart,
			enabledEnd,
			onPrevMonth,
			onNextMonth,
			onSelect,
			...passThroughs
		} = this.props;

		return (
			<div
				{...omitProps(passThroughs, DatePicker)}
				className={cx('&', className)}
				style={style}
			>
				<div className={cx('&-header')}>
					<Button size='small' onClick={onPrevMonth}><CaretIcon direction='left' /></Button>
						<span className={cx('&-month-name')}>
							{moment(date).format('MMMM YYYY')}
						</span>
					<Button size='small' onClick={onNextMonth}><CaretIcon direction='right' /></Button>
				</div>
				<CalendarMonth
					date={date}
					onSelectDate={onSelect}
					selected={selectedDate}
					selectedStart={selectedStart}
					selectedEnd={selectedEnd}
					enabledStart={enabledStart}
					enabledEnd={enabledEnd}
				/>
			</div>
		);
	},
});

export default DatePicker;
