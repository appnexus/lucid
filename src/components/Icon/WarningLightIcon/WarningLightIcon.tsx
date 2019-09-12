import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningLightIcon');

interface IWarningLightIconProps extends IIconProps {}

const WarningLightIcon: FC<IWarningLightIconProps> = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(WarningLightIcon.propTypes), false)}
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
			<path className={cx('&-background')} d='M.5 15h15L8 .5z' />
			<path className={cx('&-mark')} d='M7.99 6v4' />
			<circle className={cx('&-mark')} cx='7.99' cy='12' r='.293' />
		</Icon>
	);
};

WarningLightIcon.displayName = 'WarningLightIcon',
WarningLightIcon.peek = {
	description: `
		Diet version.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
WarningLightIcon.propTypes = {
	...Icon.propTypes,
};

export default WarningLightIcon;
