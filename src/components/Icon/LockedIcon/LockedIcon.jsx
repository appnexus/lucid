import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LockedIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * You shall not pass!
 */
const LockedIcon = createClass({
	displayName: 'LockedIcon',
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
				<path d='M11,7.051V6.5C11,4.566,9.434,3,7.5,3S4,4.566,4,6.5v0.551C3.434,7.17,3,7.648,3,8.25v4.5C3,13.44,3.56,14,4.25,14h6.5 c0.69,0,1.25-0.56,1.25-1.25v-4.5C12,7.648,11.566,7.17,11,7.051z M7.5,4.702c0.991,0,1.798,0.807,1.798,1.798V7H5.702V6.5 C5.702,5.509,6.509,4.702,7.5,4.702z'/>
			</Icon>
		);
	},
});

export default LockedIcon;
