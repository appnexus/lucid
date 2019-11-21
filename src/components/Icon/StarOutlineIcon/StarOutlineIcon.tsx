import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StarOutlineIcon');

interface IStarOutlineIconProps extends IIconProps {}

export const StarOutlineIcon = ({
	className,
	...passThroughs
}: IStarOutlineIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(StarOutlineIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M8 .75l2.318 4.696 5.182.753-3.75 3.655.885 5.162L8 12.579l-4.635 2.437.885-5.162L.5 6.199l5.182-.753z' />
		</Icon>
	);
};

StarOutlineIcon.displayName = 'StarOutlineIcon';
StarOutlineIcon.peek = {
	description: `
		It's gone supernova.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
StarOutlineIcon.propTypes = iconPropTypes;
StarOutlineIcon.defaultProps = Icon.defaultProps;

export default StarOutlineIcon;
