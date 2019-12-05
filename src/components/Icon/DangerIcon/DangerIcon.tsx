import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerIcon');

interface IDangerIconProps extends IIconProps {}

export const DangerIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IDangerIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(DangerIcon.propTypes),
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
			<path className={cx('&-x')} d='M5.5 5.5l5 5m0-5l-5 5' stroke='#fff' />
		</Icon>
	);
};

DangerIcon.displayName = 'DangerIcon';
DangerIcon.peek = {
	description: `
		DANGER WILL ROBINSON DANGER
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DangerIcon.propTypes = iconPropTypes;
DangerIcon.defaultProps = Icon.defaultProps;

export default DangerIcon;
