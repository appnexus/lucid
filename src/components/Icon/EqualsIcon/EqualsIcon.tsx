import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EqualsIcon');

interface IEqualsIconProps extends IIconProps {}

export const EqualsIcon = ({
	className,
	...passThroughs
}: IEqualsIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(EqualsIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 5.5h15m-15 5h15' />
		</Icon>
	);
};

EqualsIcon.displayName = 'EqualsIcon';
EqualsIcon.peek = {
	description: `
		An equals icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
EqualsIcon.propTypes = iconPropTypes;
EqualsIcon.defaultProps = Icon.defaultProps;

export default EqualsIcon;
