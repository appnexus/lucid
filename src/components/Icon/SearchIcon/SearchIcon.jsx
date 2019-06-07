import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SearchIcon');

const SearchIcon = createClass({
	displayName: 'SearchIcon',

	statics: {
		peek: {
			description: `
				A search icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, SearchIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<circle cx='6' cy='6' r='5.5' />
				<path d='M15.5 15.5L9.876 9.876' />
			</Icon>
		);
	},
});

export default SearchIcon;
