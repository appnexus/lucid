import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ClockIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used for time-sensitive stuff.
 */
const ClockIcon = createClass({
	displayName: 'ClockIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<path d="M8.5 1C4.358 1 1 4.358 1 8.5S4.358 16 8.5 16 16 12.642 16 8.5 12.642 1 8.5 1zm-.006 13.146c-3.12 0-5.646-2.528-5.646-5.646s2.527-5.646 5.646-5.646S14.14 5.382 14.14 8.5s-2.527 5.646-5.646 5.646z" />
				<path d="M8.494 4.297C6.177 4.297 4.29 6.183 4.29 8.5c0 2.316 1.887 4.203 4.204 4.203s4.203-1.887 4.203-4.203c0-2.317-1.885-4.203-4.203-4.203zm1.305 7.31L7.993 10V5H9v4l1.803 1.512L9.8 11.607z" />
			</Icon>
		);
	},
});

export default ClockIcon;
