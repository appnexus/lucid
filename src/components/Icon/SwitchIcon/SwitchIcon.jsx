import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SwitchIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const SwitchIcon = createClass({
	displayName: 'SwitchIcon',
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
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M15.751,6.354c-1.319,1.187-3.397,2.792-3.397,2.792S12,9.275,12,9c0-1.016,0-1.118,0-2H7C6.448,7,6,6.552,6,6s0.448-1,1-1 h5c0-0.881,0-0.986,0-2c0-0.275,0.354-0.146,0.354-0.146s2.063,1.593,3.397,2.793C15.945,5.841,15.945,6.159,15.751,6.354z M9,9H4 c0-0.881,0-0.986,0-2c0-0.275-0.354-0.146-0.354-0.146s-2.08,1.607-3.397,2.792c-0.194,0.194-0.194,0.513,0,0.707 c1.369,1.229,3.397,2.793,3.397,2.793S4,13.275,4,13c0-1.016,0-1.118,0-2h5c0.552,0,1-0.448,1-1S9.552,9,9,9z'/>
			</Icon>
		);
	},
});

export default SwitchIcon;
