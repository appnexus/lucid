import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CalendarIcon');

interface ICalendarIconProps extends IIconProps {}

export const CalendarIcon = ({
	className,
	...passThroughs
}: ICalendarIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(CalendarIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 2.5h15v13H.5zm4-2.5v4.5m7-4.5v4.5m-11 2h15' />
		</Icon>
	);
};

CalendarIcon.displayName = 'CalendarIcon';
CalendarIcon.peek = {
	description: `
		An icon for calendar-y things.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CalendarIcon.propTypes = iconPropTypes;
CalendarIcon.defaultProps = Icon.defaultProps;

export default CalendarIcon;
