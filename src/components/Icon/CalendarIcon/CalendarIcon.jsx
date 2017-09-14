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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path
					opacity=".25"
					d="M15 7V6h-2V4h-1v2h-2V4H9v2H7V4H6v2H4V4H3v2H1v1h2v2H1v1h2v2H1v1h2v2h1v-2h2v2h1v-2h2v2h1v-2h2v2h1v-2h2v-1h-2v-2h2V9h-2V7h2zM9 7v2H7V7h2zM4 7h2v2H4V7zm0 5v-2h2v2H4zm3 0v-2h2v2H7zm5 0h-2v-2h2v2zm0-3h-2V7h2v2z"
				/>
				<path d="M14.75 1H13V0h-3v1H6V0H3v1H1.25C.56 1 0 1.56 0 2.25v12.5C0 15.44.56 16 1.25 16h13.5c.69 0 1.25-.56 1.25-1.25V2.25C16 1.56 15.44 1 14.75 1zM11 1h1v2h-1V1zM4 1h1v2H4V1zm11 13.75c0 .14-.11.25-.25.25H1.25c-.138 0-.25-.11-.25-.25V4.25c0-.138.112-.25.25-.25h13.5c.14 0 .25.112.25.25v10.5z" />
			</Icon>
		);
	},
});

export default CalendarIcon;
