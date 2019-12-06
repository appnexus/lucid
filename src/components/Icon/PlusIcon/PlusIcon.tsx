import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-PlusIcon');

interface IPlusIconProps extends IIconProps {}

export const PlusIcon = ({ className, ...passThroughs }: IPlusIconProps) => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(PlusIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M8 .5v15M15.5 8H.5' />
		</Icon>
	);
};

PlusIcon.displayName = 'PlusIcon';
PlusIcon.peek = {
	description: `
		A plus icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
PlusIcon.propTypes = iconPropTypes;
PlusIcon.defaultProps = Icon.defaultProps;

export default PlusIcon;
