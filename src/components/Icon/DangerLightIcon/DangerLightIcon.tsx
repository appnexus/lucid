import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerLightIcon');

export interface IDangerLightIconProps extends IIconProps {}

export const DangerLightIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IDangerLightIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(DangerLightIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				className,
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable'
			)}
		>
			<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
			<path className={cx('&-x')} d='M5.5 5.5l5 5m0-5l-5 5' />
		</Icon>
	);
};

DangerLightIcon._isPrivate = true;
DangerLightIcon.displayName = 'DangerLightIcon';
DangerLightIcon.peek = {
	description: `
		DEPRECATED: this component should not be used and will be removed from the library in a future release.
		
		DANGER WILL ROBINSON DANGER (but lighter)
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DangerLightIcon.propTypes = iconPropTypes;
DangerLightIcon.defaultProps = Icon.defaultProps;

export default DangerLightIcon;
