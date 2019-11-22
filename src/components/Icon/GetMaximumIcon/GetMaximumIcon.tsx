import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GetMaximumIcon');

interface IGetMaximumIconProps extends IIconProps {}

export const GetMaximumIcon: FC<IGetMaximumIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(GetMaximumIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<circle cx='6' cy='6' r='5.5' />
			<path d='M15.5 15.5L9.876 9.876' />
		</Icon>
	);
};

GetMaximumIcon.displayName = 'GetMaximumIcon';
GetMaximumIcon.peek = {
	description: `
		A get maximum icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
GetMaximumIcon.propTypes = iconPropTypes;

export default GetMaximumIcon;
