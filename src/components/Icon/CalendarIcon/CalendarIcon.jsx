import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An icon for calendar-y things.
 */
const CalendarIcon = createClass({
	displayName: 'CalendarIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path opacity='0.25' d='M15,7V6h-2V4h-1v2h-2V4H9v2H7V4H6v2H4V4H3v2H1v1h2v2H1v1h2v2H1v1h2v2h1v-2h2v2 h1v-2h2v2h1v-2h2v2h1v-2h2v-1h-2v-2h2V9h-2V7H15z M9,7v2H7V7H9z M4,7h2v2H4V7z M4,12v-2h2v2H4z M7,12v-2h2v2H7z M12,12h-2v-2h2V12z M12,9h-2V7h2V9z'/>
				<path d='M14.75,1H13V0h-1h-1h-1v1H6V0H5H4H3v1H1.25C0.56,1,0,1.56,0,2.25v12.5C0,15.439,0.56,16,1.25,16H8h6.75 c0.689,0,1.25-0.561,1.25-1.25V2.25C16,1.56,15.439,1,14.75,1z M11,1h1v2h-1V1z M4,1h1v2H4V1z M15,14.75 c0,0.139-0.111,0.25-0.25,0.25H8H1.25C1.112,15,1,14.889,1,14.75V4.25C1,4.112,1.112,4,1.25,4H3h1h1h1h4h1h1h1h1.75 C14.889,4,15,4.112,15,4.25V14.75z'/>
			</Icon>
		);
	},
});

export default CalendarIcon;
