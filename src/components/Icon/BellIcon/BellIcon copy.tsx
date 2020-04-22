import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BellIcon');

interface IBellIconProps extends IIconProps {}

export const BellIcon = ({ className, ...passThroughs }: IBellIconProps) => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(BellIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M5.5 12.5v.5a2.5 2.5 0 1 0 5 0l.003-.495M14.5 12.5v-2s-1.884-1.587-1.884-6.024C12.616 3.575 11.707.5 8 .5S3.384 3.575 3.384 4.476C3.384 8.913 1.5 10.5 1.5 10.5v2h13z' />
		</Icon>
	);
};

BellIcon.displayName = 'BellIcon';
BellIcon.peek = {
	description: `
		Typically used for notifications.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
BellIcon.propTypes = {
	iconPropTypes,
};
BellIcon.defaultProps = Icon.defaultProps;

export default BellIcon;
