import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HamburgerMenuIcon');

interface IHamburgerMenuIconProps extends IIconProps {}

export const HamburgerMenuIcon = ({
	className,
	...passThroughs
}: IHamburgerMenuIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(HamburgerMenuIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			width={16}
			height={16}
			viewBox='0 0 16 16'
			className={cx('&', className)}
		>
			<path d='M.5 8h15M.5 13.5h15M.5 2.5h15' />
		</Icon>
	);
};

HamburgerMenuIcon._isPrivate = true;
HamburgerMenuIcon.displayName = 'HamburgerIcon';
HamburgerMenuIcon.peek = {
	description: `
		A hamburger menu icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
HamburgerMenuIcon.propTypes = iconPropTypes;
HamburgerMenuIcon.defaultProps = Icon.defaultProps;

export default HamburgerMenuIcon;
