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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M6.792 7.698c.126.138.208.318.208.504v5.483c0 .33.386.498.622.266l1.09-1.752c.204-.245.288-.367.288-.61V8.204c0-.186.1-.367.225-.504l4.627-4.763C14.18 2.58 13.927 2 13.44 2H2.61c-.487 0-.74.578-.41.937l4.592 4.76z" />
			</Icon>
		);
	},
});

export default FilterIcon;
