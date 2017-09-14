import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BellIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used for notifications.
 */
const BellIcon = createClass({
	displayName: 'BellIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<path d="M15 13H1l.004-1C2.227 10.926 3.5 10.318 3.5 9l.008-3.19c0-1.49.337-3.094 3.286-4.245 0 0 .265-1.064 1.21-1.064s1.212 1.065 1.212 1.065c2.95 1.15 3.286 2.754 3.286 4.244V9c0 1.318 1.27 1.926 2.494 3L15 13zm-6.987 3c1.183 0 2.17-.795 2.438-2H5.577c.266 1.205 1.254 2 2.437 2z" />
			</Icon>
		);
	},
});

export default BellIcon;
