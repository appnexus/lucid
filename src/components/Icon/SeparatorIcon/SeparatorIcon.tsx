import _, { omit } from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-SeparatorIcon');

export interface ISeparatorIconProps extends IIconProps {}

export const SeparatorIcon = ({
	className,
	...passThroughs
}: ISeparatorIconProps) => {
	return (
		<Icon
			{...omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			<path d='M5.2 0h1.5l4 8-4 8H5.2l4-8-4-8z' />
		</Icon>
	);
};

SeparatorIcon._isPrivate = true;
SeparatorIcon.displayName = 'SeparatorIcon';
SeparatorIcon.peek = {
	description: `A separator icon.`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SeparatorIcon.propTypes = iconPropTypes;
SeparatorIcon.defaultProps = Icon.defaultProps;

export default SeparatorIcon;
