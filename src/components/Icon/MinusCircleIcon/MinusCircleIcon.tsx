import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusCircleIcon');

interface IMinusCircleIconProps extends IIconProps {}

const MinusCircleIcon: FC<IMinusCircleIconProps> = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(MinusCircleIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
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

MinusCircleIcon.displayName = 'MinusCircleIcon',
MinusCircleIcon.peek = {
	description: `
		Minus circle icon
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
MinusCircleIcon.propTypes = {
	...Icon.propTypes,
};

export default MinusCircleIcon;
