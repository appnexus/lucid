import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinimizeIcon');

interface IMinimizeIconProps extends IIconProps {}

export const MinimizeIcon = ({
	className,
	...passThroughs
}: IMinimizeIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(MinimizeIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M15.5 6.5h-6v-6m-3 15v-6h-6' />
		</Icon>
	);
};

MinimizeIcon.displayName = 'MinimizeIcon';
MinimizeIcon.peek = {
	description: `
		A minimize icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
MinimizeIcon.propTypes = iconPropTypes;
MinimizeIcon.defaultProps = Icon.defaultProps;

export default MinimizeIcon;
