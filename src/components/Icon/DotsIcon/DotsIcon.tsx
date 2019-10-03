import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';
import { Color } from '../Icon';

const cx = lucidClassNames.bind('&-DotsIcon');

interface IDotsIconProps extends IIconProps {}

export const DotsIcon: FC<IDotsIconProps> = ({
	className,
	color = Color.primary,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(DotsIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			color={color}
			className={cx('&', className)}
		>
			<circle className={cx(`&-color-${color}`)} cx='8' cy='8' r='1' />
			<circle className={cx(`&-color-${color}`)} cx='14.5' cy='8' r='1' />
			<circle className={cx(`&-color-${color}`)} cx='1.5' cy='8' r='1' />
		</Icon>
	);
};

DotsIcon.displayName = 'DotsIcon';
DotsIcon.peek = {
	description: `
		Three dots in a row.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DotsIcon.propTypes = iconPropTypes;

export default DotsIcon;
