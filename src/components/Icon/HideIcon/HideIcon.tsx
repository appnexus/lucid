import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HideIcon');

interface IHideIconProps extends IIconProps {}

export const HideIcon: FC<IHideIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(HideIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M15.5 8s-3-4.5-7.5-4.5S.5 8 .5 8 4 12.5 8 12.5 15.5 8 15.5 8z' />
			<circle cx='8' cy='8' r='1.25' />
			<path d='M2.5 13.5l11-11' />
		</Icon>
	);
};

HideIcon.displayName = 'HideIcon';
HideIcon.peek = {
	description: `
		A hide icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
HideIcon.propTypes = iconPropTypes;

export default HideIcon;
