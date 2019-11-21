import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UserIcon');

interface IUserIconProps extends IIconProps {}

export const UserIcon = ({
	className,
	...passThroughs
}: IUserIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(UserIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 16a7.5 7.5 0 0 1 15 0' />
			<circle cx='8' cy='4.5' r='4' />
		</Icon>
	);
};

UserIcon.displayName = 'UserIcon';
UserIcon.peek = {
	description: `
		It's all about you.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
UserIcon.propTypes = iconPropTypes;
UserIcon.defaultProps = Icon.defaultProps;

export default UserIcon;
