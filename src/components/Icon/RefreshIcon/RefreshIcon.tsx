import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-RefreshIcon');

interface IRefreshIconProps extends IIconProps {}

export const RefreshIcon = ({
	className,
	...passThroughs
}: IRefreshIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(RefreshIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M15.5 8a7.5 7.5 0 1 1-1.122-3.949' />
			<path d='M14.5.244v4h-4' />
		</Icon>
	);
};

RefreshIcon.displayName = 'RefreshIcon';
RefreshIcon.peek = {
	description: `
		A refresh icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
RefreshIcon.propTypes = iconPropTypes;
RefreshIcon.defaultProps = Icon.defaultProps;

export default RefreshIcon;
