import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FlagIcon');

interface IFlagIconProps extends IIconProps { }

export const FlagIcon = ({ className, ...passThroughs }: IFlagIconProps) => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(FlagIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M1.5 9.5s1.083-1 3.25-1 3.25 1 5.417 1 4.333-1 4.333-1v-8s-2.167 1-4.333 1-3.25-1-5.417-1-3.25 1-3.25 1v8zM1.5.5v15' />
		</Icon>
	);
}

FlagIcon.displayName = 'FlagIcon';

FlagIcon.peek = {
	description: `
		A flag icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
}

FlagIcon.propTypes = iconPropTypes;


export default FlagIcon;
