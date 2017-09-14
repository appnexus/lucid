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
 * A swap icon.
 */
const SwitchIcon = createClass({
	displayName: 'SwitchIcon',
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
				<path d="M15.75 6.354c-1.318 1.187-3.396 2.792-3.396 2.792S12 9.276 12 9V7H7c-.552 0-1-.448-1-1s.448-1 1-1h5V3c0-.275.354-.146.354-.146s2.063 1.593 3.397 2.793c.196.194.196.512 0 .707zM9 9H4V7c0-.275-.354-.146-.354-.146S1.566 8.46.25 9.646c-.195.194-.195.513 0 .707 1.368 1.23 3.396 2.793 3.396 2.793S4 13.276 4 13v-2h5c.552 0 1-.448 1-1s-.448-1-1-1z" />
			</Icon>
		);
	},
});

export default SwitchIcon;
