import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ShoppingCartIcon');

interface IShoppingCartIconProps extends IIconProps {}

export const ShoppingCartIcon = ({
	className,
	...passThroughs
}: IShoppingCartIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ShoppingCartIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M13.5 14a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM7 13.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z' />
			<path d='M14.5 11.5h-9l-2-7h12z' />
			<path d='M3.5 4.5l-1-2h-2' />
		</Icon>
	);
};

ShoppingCartIcon.displayName = 'ShoppingCartIcon';
ShoppingCartIcon.peek = {
	description: `
		Buy buy buy!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ShoppingCartIcon.propTypes = iconPropTypes;
ShoppingCartIcon.defaultProps = Icon.defaultProps;

export default ShoppingCartIcon;
