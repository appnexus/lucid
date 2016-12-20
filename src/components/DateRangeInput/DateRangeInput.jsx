import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import * as reducers from './DateRangeInput.reducers';
import DatePicker from '../DatePicker/DatePicker';
import TextField from '../TextField/TextField';
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
			textValueStart: '',
			textValueEnd: '',
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

	render() {
		const {
			className,
			style,
			date,
			textValueStart,
			textValueEnd,
			DatePicker: DatePickerProps,
			onSelectStart,
			onSelectEnd,
			...passThroughs
		} = this.props;

		return (
			<div
				{...omitProps(passThroughs, DateRangeInput)}
				className={cx('&', className)}
				style={style}
			>
				<ToolTip>
					<ToolTip.Target>
						<span className={cx('&-inputs')}>
							<TextField onFocus={this.setFocus('start')} value={textValueStart} /> To <TextField onFocus={this.setFocus('end')} value={textValueEnd} />
						</span>
					</ToolTip.Target>
					<ToolTip.Body>
						<DatePicker
							date={date}
							{...DatePickerProps}
							onSelect={(...args) => (this.focusedInput === 'end' ? onSelectEnd(...args) : onSelectStart(...args))}
						/>
					</ToolTip.Body>
				</ToolTip>
			</div>
		);
	},
});

export default DateRangeInput;
