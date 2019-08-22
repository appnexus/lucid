import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarIcon');

interface ICalendarIconProps extends IIconProps {}

const CalendarIcon: FC<ICalendarIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
		{...omitProps(passThroughs, undefined, _.keys(CalendarIcon.propTypes), false)}
		{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 2.5h15v13H.5zm4-2.5v4.5m7-4.5v4.5m-11 2h15' />
		</Icon>
	);
};

CalendarIcon.displayName = 'CalendarIcon',
CalendarIcon.peek = {
	description: `
		An icon for calendar-y things.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CalendarIcon.propTypes = {
	...Icon.propTypes,
};

export default CalendarIcon;
