import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperHorizontalIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A horizontal gripper icon.
 */
const GripperHorizontalIcon = createClass({
	displayName: 'GripperHorizontalIcon',

	_isPrivate: true,

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				width={16}
				height={2}
				viewBox="0 0 16 2"
				{...passThroughs}
				className={cx('&', className)}
			>
				<path d="M0 0h1v2H0V0zM2 0h1v2H2V0zM4 0h1v2H4V0zM6 0h1v2H6V0zM8 0h1v2H8V0zM10 0h1v2h-1V0zM12 0h1v2h-1V0zM14 0h1v2h-1V0z" />
			</Icon>
		);
	},
});

export default GripperHorizontalIcon;
