import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BellIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used for notifications.
 */
const BellIcon = createReactClass({
	displayName: 'BellIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<path d="M15,13H1l0.004-1c1.223-1.074,2.497-1.682,2.497-3l0.007-3.191 c0-1.489,0.337-3.093,3.286-4.244c0,0,0.265-1.064,1.211-1.064s1.211,1.064,1.211,1.064c2.949,1.15,3.286,2.754,3.286,4.244V9 c0,1.318,1.271,1.926,2.494,3L15,13z M8.013,16c1.183,0,2.171-0.795,2.438-2H5.576C5.842,15.205,6.83,16,8.013,16z" />
			</Icon>
		);
	},
});

export default BellIcon;
