import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InfoLightIcon');

interface IInfoLightIconProps extends IIconProps {}

export const InfoLightIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IInfoLightIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(InfoLightIcon.propTypes),
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
			<path className={cx('&-stem')} d='M7.99 12.5v-6' />
			<circle className={cx('&-dot')} cx='7.99' cy='4' r='.293' />
		</Icon>
	);
};

InfoLightIcon.displayName = 'InfoLightIcon';
InfoLightIcon.peek = {
	description: `
		A light info icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
InfoLightIcon.propTypes = iconPropTypes;
InfoLightIcon.defaultProps = Icon.defaultProps;

export default InfoLightIcon;
