import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SearchIcon');

interface ISearchIconProps extends IIconProps {}

export const SearchIcon = ({
	className,
	...passThroughs
}: ISearchIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(SearchIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<circle cx='6' cy='6' r='5.5' />
			<path d='M15.5 15.5L9.876 9.876' />
		</Icon>
	);
};

SearchIcon.displayName = 'SearchIcon';
SearchIcon.peek = {
	description: `
		A search icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SearchIcon.propTypes = iconPropTypes;
SearchIcon.defaultProps = Icon.defaultProps;

export default SearchIcon;
