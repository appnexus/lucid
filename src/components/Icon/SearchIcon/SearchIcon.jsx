import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import {
	createClass as createReactClass,
	omitProps,
} from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SearchIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A search icon.
 */
const SearchIcon = createReactClass({
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
				<path d="M14.309,12.893L10.87,9.455c0.571-0.844,0.905-1.86,0.905-2.955c0-2.913-2.362-5.274-5.274-5.274S1.226,3.587,1.226,6.5 s2.362,5.273,5.274,5.273c1.095,0,2.111-0.334,2.955-0.904l3.439,3.438c0.391,0.392,1.023,0.392,1.414,0 C14.699,13.917,14.699,13.283,14.309,12.893z M2.424,6.5c0-2.247,1.829-4.076,4.076-4.076s4.076,1.829,4.076,4.076 S8.747,10.576,6.5,10.576S2.424,8.747,2.424,6.5z" />
			</Icon>
		);
	},
});

export default SearchIcon;
