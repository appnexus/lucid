import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusIcon');

interface IMinusIconProps extends IIconProps {}

const MinusIcon: FC<IMinusIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(MinusIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M15.5 8H.5' />
		</Icon>
	);
};

MinusIcon.displayName = 'MinusIcon',
MinusIcon.peek = {
	description: `
		A minus icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
MinusIcon.propTypes = {
	...Icon.propTypes,
};

export default MinusIcon;
