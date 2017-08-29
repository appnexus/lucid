import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import {
	createClass as createReactClass,
	omitProps,
} from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StopwatchIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A Stopwatch Icon.
 */
const StopwatchIcon = createReactClass({
	displayName: 'StopwatchIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, StopwatchIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M0,6.5C0,6.2,0.2,6,0.5,6h6C6.8,6,7,6.2,7,6.5C7,6.8,6.8,7,6.5,7h-6C0.2,7,0,6.8,0,6.5z M6,10.5C6,10.2,5.8,10,5.5,10h-5C0.2,10,0,10.2,0,10.5C0,10.8,0.2,11,0.5,11h5C5.8,11,6,10.8,6,10.5z M0.5,9h4C4.8,9,5,8.8,5,8.5C5,8.2,4.8,8,4.5,8h-4C0.2,8,0,8.2,0,8.5C0,8.8,0.2,9,0.5,9z M9.7,9l2.8-2.8c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L9,8.3C8.8,8.5,8.8,8.8,9,9C9.2,9.2,9.5,9.2,9.7,9z M10,2V1h1c0.3,0,0.5-0.2,0.5-0.5C11.5,0.2,11.3,0,11,0H8C7.7,0,7.5,0.2,7.5,0.5C7.5,0.8,7.7,1,8,1h1v1C7.3,2.2,5.8,2.9,4.7,4.2c-0.2,0.2-0.2,0.5,0,0.7C4.9,5,5.2,5,5.4,4.8C6.5,3.7,7.9,3,9.5,3c3,0,5.5,2.5,5.5,5.5S12.5,14,9.5,14c-1.6,0-3.1-0.7-4.1-1.9c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7c1.2,1.4,3,2.2,4.9,2.2c3.6,0,6.5-2.9,6.5-6.5C16,5.1,13.4,2.3,10,2z" />
			</Icon>
		);
	},
});

export default StopwatchIcon;
