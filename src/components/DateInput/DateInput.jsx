import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import * as reducers from './DateInput.reducers';
import DatePicker from '../DatePicker/DatePicker';
import TextField from '../TextField/TextField';
import { ToolTip } from '../../index';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-DateInput');

const {
	any,
	func,
	object,
	string,
} = React.PropTypes;


/**
 * {"categories": ["helpers"]}
 *
 * DateInput is used to wrap content to better organize elements in window.
 */
const DateInput = createClass({
	displayName: 'DateInput',

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
		/** textValue */
		textValue: string,
		/** DatePicker */
		DatePicker: any,
		/** onSelect */
		onSelect: func,
	},

	getDefaultProps() {
		return {
			className: null,
			style: null,
			date: moment(),
			textValue: '',
			DatePicker: DatePicker.definition.getDefaultProps(),
			onSelect: _.noop,
		};
	},

	render: function() {
		const {
			className,
			style,
			date,
			textValue,
			DatePicker: DatePickerProps,
			onSelect,
			...passThroughs
		} = this.props;

		return (
			<div
				{...omitProps(passThroughs, DateInput)}
				className={cx('&', className)}
				style={style}
			>
				<ToolTip>
					<ToolTip.Target>
						<TextField value={textValue} />
					</ToolTip.Target>
					<ToolTip.Body>
						<DatePicker
							date={date}
							{...DatePickerProps}
							onSelect={onSelect}
						/>
					</ToolTip.Body>
				</ToolTip>
			</div>
		);
	},
});

export default DateInput;
