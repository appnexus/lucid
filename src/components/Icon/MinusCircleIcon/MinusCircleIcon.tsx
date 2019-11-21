import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusCircleIcon');

interface IMinusCircleIconProps extends IIconProps {}

export const MinusCircleIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IMinusCircleIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(MinusCircleIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable',
				className
			)}
		>
			<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
			<path className={cx('&-dash')} d='M4.5 8h7' />
		</Icon>
	);
};

MinusCircleIcon.displayName = 'MinusCircleIcon';
MinusCircleIcon.peek = {
	description: `
		Minus circle icon
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
MinusCircleIcon.propTypes = iconPropTypes;
MinusCircleIcon.defaultProps = Icon.defaultProps;

export default MinusCircleIcon;
