import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WrenchIcon');

interface IWrenchIconProps extends IIconProps {}

export const WrenchIcon = ({
	className,
	...passThroughs
}: IWrenchIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(WrenchIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M15.18 4.728l-2.576 1.451-1.844-1.075-.01-2.134 2.577-1.451.003-.367c-1.368-.826-3.134-.899-4.611-.029C7.014 2.127 6.203 4.145 6.625 6.01l-5.427 5.427c-.93.93-.93 2.439 0 3.369.93.93 2.439.93 3.369 0l5.422-5.422c1.072.248 2.236.107 3.264-.486 1.471-.85 2.247-2.419 2.247-3.989l-.32-.181z' />
			<circle cx='2.864' cy='13.144' r='.25' />
		</Icon>
	);
};

WrenchIcon.displayName = 'WrenchIcon';
WrenchIcon.peek = {
	description: `
		A wrench icon, used for indicating something you forcibly pull, twist, turn or jerk.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
WrenchIcon.propTypes = iconPropTypes;
WrenchIcon.defaultProps = Icon.defaultProps;

export default WrenchIcon;
