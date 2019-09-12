import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const { bool } = PropTypes;

const cx = lucidClassNames.bind('&-SuccessLightIcon');

interface ISuccessLightIconProps extends IIconProps {
	/** Controls the active state of the Icon. Basically toggles the same "look n
		feel" as when you hover. */
	isActive?: boolean;
}

const SuccessLightIcon: FC<ISuccessLightIconProps> = ({
	className,
	isActive,
	isClickable,
	isDisabled,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(SuccessLightIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
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
			<path className={cx('&-check')} d='M4.5 8L7 10.5 11.5 6' />
		</Icon>
	);
};

SuccessLightIcon.displayName = 'SuccessLightIcon',
SuccessLightIcon.peek = {
	description: `
		Nothing like a mild success in the morning to get the blood flowing!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SuccessLightIcon.propTypes = {
	...Icon.propTypes,
	isActive: bool`
		Controls the active state of the Icon. Basically toggles the same "look n
		feel" as when you hover.
	`,
};

export default SuccessLightIcon;
