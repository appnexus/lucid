import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StarIcon');

interface IStarIconProps extends IIconProps {}

const StarIcon: FC<IStarIconProps> = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(StarIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			isDisabled={isDisabled}
			isClickable={isClickable}
			className={cx(
				'&',
				isClickable && '&-is-clickable',
				isDisabled && '&-is-disabled',
				className
			)}
		>
			<path
				className={cx('&-background')}
				d='M8 .75l2.318 4.696 5.182.753-3.75 3.655.885 5.162L8 12.579l-4.635 2.437.885-5.162L.5 6.199l5.182-.753z'
			/>
		</Icon>
	);
};

StarIcon.displayName = 'StarIcon',
StarIcon.peek = {
	description: `
		You're a shooting star!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
StarIcon.propTypes = {
	...Icon.propTypes,
};

export default StarIcon;
