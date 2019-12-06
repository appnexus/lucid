import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusIcon');

interface IMinusIconProps extends IIconProps {}

export const MinusIcon = ({
	className,
	...passThroughs
}: IMinusIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(MinusIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M15.5 8H.5' />
		</Icon>
	);
};

MinusIcon.displayName = 'MinusIcon';
MinusIcon.peek = {
	description: `
		A minus icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
MinusIcon.propTypes = iconPropTypes;
MinusIcon.defaultProps = Icon.defaultProps;

export default MinusIcon;
