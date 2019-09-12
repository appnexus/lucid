import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SearchIcon');

interface ISearchIconProps extends IIconProps {}

const SearchIcon: FC<ISearchIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(SearchIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<circle cx='6' cy='6' r='5.5' />
			<path d='M15.5 15.5L9.876 9.876' />
		</Icon>
	);
};

SearchIcon.displayName = 'SearchIcon',
SearchIcon.peek = {
	description: `
		A search icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SearchIcon.propTypes = {
	...Icon.propTypes,
};

export default SearchIcon;
