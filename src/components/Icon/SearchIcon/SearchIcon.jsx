import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SearchIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A search icon.
 */
const SearchIcon = createClass({
	displayName: 'SearchIcon',
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
				<path d="M14.31 12.893l-3.44-3.438c.57-.844.905-1.86.905-2.955 0-2.913-2.362-5.274-5.274-5.274S1.227 3.586 1.227 6.5s2.362 5.273 5.274 5.273c1.095 0 2.11-.334 2.955-.904l3.44 3.437c.39.392 1.022.392 1.413 0 .39-.39.39-1.024 0-1.414zM2.423 6.5c0-2.247 1.83-4.076 4.076-4.076s4.076 1.83 4.076 4.076-1.83 4.076-4.076 4.076S2.424 8.746 2.424 6.5z" />
			</Icon>
		);
	},
});

export default SearchIcon;
