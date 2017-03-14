import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinimizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A minimize icon.
 */
const MinimizeIcon = createClass({
	displayName: 'MinimizeIcon',
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
				{...omitProps(passThroughs, MinimizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M6.996,10.828c0.002,0.002,0,4.172,0,4.172H5v-4H1l0.003-1.993c0,0,4.231-0.002,4.233,0C6.049,8.93,6.531,9.514,6.531,9.514 S7.053,10.014,6.996,10.828z M11,5V1L9.007,1.003c0,0-0.002,4.231,0,4.233C8.93,6.049,9.514,6.531,9.514,6.531 s0.5,0.521,1.314,0.465c0.002,0.002,4.172,0,4.172,0V5H11z'/>
			</Icon>
		);
	},
});

export default MinimizeIcon;
