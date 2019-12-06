import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const { bool } = PropTypes;

const cx = lucidClassNames.bind('&-MinusCircleLightIcon');

interface IMinusCircleLightIconProps extends IIconProps {
	/** Controls the active state of the Icon. Basically toggles the same "look n
		feel" as when you hover. */
	isActive?: boolean;
}

export const MinusCircleLightIcon = ({
	className,
	isActive,
	isDisabled,
	isClickable,
	...passThroughs
}: IMinusCircleLightIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(MinusCircleLightIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable',
				isActive && '&-is-active',
				className
			)}
		>
			<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
			<path className={cx('&-dash')} d='M4.5 8h7' />
		</Icon>
	);
};

MinusCircleLightIcon.displayName = 'MinusCircleLightIcon';
MinusCircleLightIcon.peek = {
	description: `
		Minus circle light icon
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
MinusCircleLightIcon.propTypes = {
	...iconPropTypes,
	isActive: bool`
		Controls the active state of the Icon. Basically toggles the same "look n
		feel" as when you hover.
	`,
};
MinusCircleLightIcon.defaultProps = Icon.defaultProps;

export default MinusCircleLightIcon;
