import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerLightIcon');

interface IDangerLightIconProps extends IIconProps {}

const DangerLightIcon: FC<IDangerLightIconProps> = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(DangerLightIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
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

DangerLightIcon.displayName = 'DangerLightIcon',
DangerLightIcon.peek = {
	description: `
		DANGER WILL ROBINSON DANGER (but lighter)
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DangerLightIcon.propTypes = {
	...Icon.propTypes,
};

export default DangerLightIcon;
