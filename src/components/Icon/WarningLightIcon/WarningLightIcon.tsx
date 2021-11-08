import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningLightIcon');

export interface IWarningLightIconProps extends IIconProps {}

export const WarningLightIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IWarningLightIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(WarningLightIcon.propTypes),
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
			<path className={cx('&-background')} d='M.5 15h15L8 .5z' />
			<path className={cx('&-mark')} d='M7.99 5v4' />
			<circle className={cx('&-mark')} cx='7.99' cy='12' r='.293' />
		</Icon>
	);
};

WarningLightIcon._isPrivate = true;
WarningLightIcon.displayName = 'WarningLightIcon';
WarningLightIcon.peek = {
	description: `
		DEPRECATED: this component should not be used and will be removed from the library in a future release.
		
		Diet version.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
WarningLightIcon.propTypes = iconPropTypes;
WarningLightIcon.defaultProps = Icon.defaultProps;

export default WarningLightIcon;
