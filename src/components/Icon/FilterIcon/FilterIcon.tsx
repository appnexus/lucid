import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FilterIcon');

interface IFilterIconProps extends IIconProps {}

export const FilterIcon: FC<IFilterIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(FilterIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5.5v2l6 6v7l3-2v-5l6-6v-2z' />
		</Icon>
	);
};

FilterIcon.displayName = 'FilterIcon';
FilterIcon.peek = {
	description: `
		Typically used to denote that something is filterable.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
FilterIcon.propTypes = iconPropTypes;

export default FilterIcon;
