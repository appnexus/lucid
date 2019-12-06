import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CheckIcon');

interface ICheckIconProps extends IIconProps {}

export const CheckIcon = ({ className, ...passThroughs }: ICheckIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(CheckIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 7L6 12.5 15.5 3' />
		</Icon>
	);
};

CheckIcon.displayName = 'CheckIcon';
CheckIcon.peek = {
	description: `
		A check icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CheckIcon.propTypes = iconPropTypes;
CheckIcon.defaultProps = Icon.defaultProps;

export default CheckIcon;
