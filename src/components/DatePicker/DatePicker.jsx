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
	bool,
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

	reducers: reducers,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/** style */
		style: object,
		/** date */
		date: any,
	},

	getDefaultProps() {
		return {
			className: null,
			style: null,
			date: moment(),
		};
	},

	render: function() {
		const {
			className,
			style,
			date,
			onPrevMonth,
			onNextMonth,
			...passThroughs
		} = this.props;

		return (
			<div
				{...omitProps(passThroughs, DatePicker)}
				className={className}
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
				/>
			</div>
		);
	},
});

export default DatePicker;
