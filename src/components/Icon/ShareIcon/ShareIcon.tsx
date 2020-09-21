import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ShareIcon');

interface IShareIconProps extends IIconProps {}

export const ShareIcon = ({ className, ...passThroughs }: IShareIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ShareIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<circle cx='2.75' cy='8' r='2.25' />
			<circle cx='13.25' cy='2.75' r='2.25' />
			<circle cx='13.25' cy='13.25' r='2.25' />
			<path d='M4.852 9.051l6.286 3.143M11.145 3.803L4.85 6.95' />
		</Icon>
	);
};

ShareIcon.displayName = 'ShareIcon';
ShareIcon.peek = {
	description: `
		A share icon, used to distribute a link or some information to another Internet user.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ShareIcon.propTypes = iconPropTypes;
ShareIcon.defaultProps = Icon.defaultProps;

export default ShareIcon;
