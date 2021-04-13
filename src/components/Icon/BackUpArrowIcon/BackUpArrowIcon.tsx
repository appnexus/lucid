import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BackUpArrowIcon');

export const BackUpArrowIcon: FC<IIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(BackUpArrowIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M8 .5v15h7.5' />
			<path d='M14 6.5l-6-6-6 6' />
		</Icon>
	);
};

BackUpArrowIcon.displayName = 'BackUpArrowIcon';
BackUpArrowIcon.peek = {
	description: `
		An arrow icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
BackUpArrowIcon.propTypes = {
	...iconPropTypes,
};

export default BackUpArrowIcon;
