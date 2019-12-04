import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LockedIcon');

interface ILockedIconProps extends IIconProps {}

export const LockedIcon = ({
	className,
	...passThroughs
}: ILockedIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(LockedIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M1.5 6.5h13v9h-13zm2 0V5a4.5 4.5 0 0 1 9 0v1.5m-4.51 6.793v-3' />
			<circle cx='8' cy='10' r='.5' />
		</Icon>
	);
};

LockedIcon.displayName = 'LockedIcon';
LockedIcon.peek = {
	description: `
		You shall not pass!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
LockedIcon.propTypes = iconPropTypes;
LockedIcon.defaultProps = Icon.defaultProps;

export default LockedIcon;
