import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import * as reducers from './DateRangeInput.reducers';
import DatePicker from '../DatePicker/DatePicker';
import TextField from '../TextField/TextField';
import ArrowIcon from '../Icon/ArrowIcon/ArrowIcon';

import { ToolTip } from '../../index';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-DateRangeInput');

const {
	any,
	func,
	object,
	string,
} = React.PropTypes;


/**
 * {"categories": ["helpers"]}
 *
 * DateRangeInput is used to wrap content to better organize elements in window.
 */
const DateRangeInput = createClass({
	displayName: 'DateRangeInput',

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
		/** textValueStart */
		textValueStart: string,
		/** textValueEnd */
		textValueEnd: string,
		/** DatePicker */
		DatePicker: any,
		/** onSelectStart */
		onSelectStart: func,
		/** onSelectEnd */
		onSelectEnd: func,
	},

	getDefaultProps() {
		return {
			className: null,
			style: null,
			date: moment(),
			textValueStart: null,
			textValueEnd: null,
			DatePicker: DatePicker.definition.getDefaultProps(),
			onSelectStart: _.noop,
			onSelectEnd: _.noop,
		};
	},

	setFocus(type) {
		return () => {
			this.focusedInput = type;
		};
	},

	handleSelect(...args) {
		const {
			onSelectStart,
			onSelectEnd,
		} = this.props;

		if (this.focusedInput === 'end') {
			onSelectEnd(...args);
		} else {
			onSelectStart(...args);
		}

		this.inputEnd.focus();
	},

	render() {
		const {
			className,
			style,
			date,
			textValueStart,
			textValueEnd,
			DatePicker: DatePickerProps,
			...passThroughs
		} = this.props;

		return (
			<div
				{...omitProps(passThroughs, DateRangeInput)}
				className={cx('&', className)}
				style={style}
			>
				<ToolTip direction='down'>
					<ToolTip.Target>
						<span className={cx('&-inputs')}>
							<TextField onFocus={this.setFocus('start')} value={_.isNil(textValueStart) ? '' : textValueStart} />
							<ArrowIcon direction='right'/>
							<TextField ref={(ref) => {this.inputEnd = ref;}} onFocus={this.setFocus('end')} value={_.isNil(textValueEnd) ? '' : textValueEnd} />
						</span>
					</ToolTip.Target>
					<ToolTip.Body>
						<DatePicker
							date={date}
							{...DatePickerProps}
							selectedStart={textValueStart}
							selectedEnd={textValueEnd}
							onSelect={this.handleSelect}
						/>
					</ToolTip.Body>
				</ToolTip>
			</div>
		);
	},
});

export default DateRangeInput;
