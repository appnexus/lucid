import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FilterIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to denote that something is filterable.
 */
const FilterIcon = createClass({
	displayName: 'FilterIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M6.792,7.698C6.918,7.836,7,8.016,7,8.202v5.483c0,0.33,0.386,0.498,0.622,0.266l1.089-1.753 C8.916,11.953,9,11.831,9,11.588V8.204C9,8.018,9.1,7.837,9.225,7.7l4.627-4.763C14.18,2.579,13.927,2,13.44,2H2.609 c-0.486,0-0.74,0.578-0.41,0.937L6.792,7.698z'/>
			</Icon>
		);
	},
});

export default FilterIcon;
