import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InfoIcon');

interface IInfoIconProps extends IIconProps {}

const InfoIcon: FC<IInfoIconProps> = ({
	className,
	isDisabled,
	isClickable,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(InfoIcon.propTypes), false)}
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
			<path className={cx('&-i')} d='M7.99 12.5v-6' />
			<circle className={cx('&-i')} cx='7.99' cy='4' r='.293' />
		</Icon>
	);
};

InfoIcon.displayName = 'InfoIcon',
InfoIcon.peek = {
	description: `
		An info icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
InfoIcon.propTypes = {
	...Icon.propTypes,
};

export default InfoIcon;
