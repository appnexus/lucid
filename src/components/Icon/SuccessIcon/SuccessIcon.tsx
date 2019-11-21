import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SuccessIcon');

interface ISuccessIconProps extends IIconProps {}

export const SuccessIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: ISuccessIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(SuccessIcon.propTypes),
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
			<path className={cx('&-check')} d='M4.5 8L7 10.5 11.5 6' />
		</Icon>
	);
};

SuccessIcon.displayName = 'SuccessIcon';
SuccessIcon.peek = {
	description: `
		A success icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SuccessIcon.propTypes = iconPropTypes;
SuccessIcon.defaultProps = Icon.defaultProps;

export default SuccessIcon;
