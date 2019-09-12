import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerIcon');

interface IDangerIconProps extends IIconProps {}

const DangerIcon: FC<IDangerIconProps> = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(DangerIcon.propTypes), false)}
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
			<path className={cx('&-x')} d='M5.5 5.5l5 5m0-5l-5 5' stroke='#fff' />
		</Icon>
	);
};

DangerIcon.displayName = 'DangerIcon',
DangerIcon.peek = {
	description: `
		DANGER WILL ROBINSON DANGER
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DangerIcon.propTypes = {
	...Icon.propTypes,
};

export default DangerIcon;
