import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ClockIcon');

interface IClockIconProps extends IIconProps {}

export const ClockIcon: FC<IClockIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ClockIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<circle cx='8' cy='8' r='7.5' />
			<path d='M8 3.5v5l2.75 2.25' />
		</Icon>
	);
};

ClockIcon.displayName = 'ClockIcon';
ClockIcon.peek = {
	description: `
		Typically used for time-sensitive stuff.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ClockIcon.propTypes = iconPropTypes;

export default ClockIcon;
