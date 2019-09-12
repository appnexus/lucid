import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CheckIcon');

interface ICheckIconProps extends IIconProps {}

const CheckIcon: FC<ICheckIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
		{...omitProps(passThroughs, undefined, _.keys(CheckIcon.propTypes), false)}
		{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 7L6 12.5 15.5 3' />
		</Icon>
	);
};

CheckIcon.displayName = 'CheckIcon',
CheckIcon.peek = {
	description: `
		A check icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CheckIcon.propTypes = {
	...Icon.propTypes,
};

export default CheckIcon;
