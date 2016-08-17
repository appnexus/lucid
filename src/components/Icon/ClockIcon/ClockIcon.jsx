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
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={cx('&', className)}
			>
				<path d='M8.5,1C4.358,1,1,4.358,1,8.5S4.358,16,8.5,16S16,12.642,16,8.5S12.642,1,8.5,1z M8.494,14.146 c-3.119,0-5.646-2.528-5.646-5.646s2.527-5.646,5.646-5.646s5.646,2.528,5.646,5.646S11.613,14.146,8.494,14.146z'/>
				<path d='M8.494,4.297c-2.317,0-4.203,1.886-4.203,4.203c0,2.316,1.886,4.203,4.203,4.203s4.203-1.887,4.203-4.203 C12.697,6.183,10.812,4.297,8.494,4.297z M9.799,11.607L7.994,10V5H9v4l1.803,1.512L9.799,11.607z'/>
			</Icon>
		);
	},
});

export default ClockIcon;
