import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FourSquaresIcon');

interface IFourSquaresIconProps extends IIconProps { }

export const FourSquaresIcon = ({ className, ...passThroughs }: IFourSquaresIconProps) => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(FourSquaresIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5.5h6v6h-6v-6zm0 15h6v-6h-6v6zm9 0h6v-6h-6v6zm0-15v6h6v-6h-6z' />
		</Icon>
	);
}

FourSquaresIcon.displayName = 'FourSquaresIcon';

FourSquaresIcon.peek = {
	description: `
				A four squares icon.
			`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};

FourSquaresIcon.propTypes = iconPropTypes;

export default FourSquaresIcon;
