import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GetMaximumIcon');

interface IGetMaximumIconProps extends IIconProps {}

export const GetMaximumIcon = ({
	className,
	...passThroughs
}: IGetMaximumIconProps) => {
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
			<path d='M15.5 8.5H.5v-1l15-7z' />
			<path d='M3.5 13H13M11.5 15l2-2-2-2' />
			<path d='M12.5 8.5V1.9M9.5 8.5V3.3M6.5 8.5V4.7M3.5 8.5V6.125' />
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
GetMaximumIcon.defaultProps = Icon.defaultProps;

export default GetMaximumIcon;
