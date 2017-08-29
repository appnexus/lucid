import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperHorizontalIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A horizontal gripper icon.
 */
const GripperHorizontalIcon = createReactClass({
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
				<path d="M0,0h1v2H0V0z" />
				<path d="M2,0h1v2H2V0z" />
				<path d="M4,0h1v2H4V0z" />
				<path d="M6,0h1v2H6V0z" />
				<path d="M8,0h1v2H8V0z" />
				<path d="M10,0h1v2H10V0z" />
				<path d="M12,0h1v2H12V0z" />
				<path d="M14,0h1v2H14V0z" />
			</Icon>
		);
	},
});

export default GripperHorizontalIcon;
