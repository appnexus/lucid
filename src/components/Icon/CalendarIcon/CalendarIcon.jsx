import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarIcon');

const CalendarIcon = createClass({
	displayName: 'CalendarIcon',

	statics: {
		peek: {
			description: `
				An icon for calendar-y things.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

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
				<path d='M.5 2.5h15v13H.5zm4-2.5v4.5m7-4.5v4.5m-11 2h15' />
			</Icon>
		);
	},
});

export default CalendarIcon;
