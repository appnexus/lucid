import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperHorizontalIcon');

const GripperHorizontalIcon = createClass({
	displayName: 'GripperHorizontalIcon',

	statics: {
		peek: {
			description: `
				A horizontal gripper icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

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
				viewBox='0 0 16 2'
				{...passThroughs}
				className={cx('&', className)}
			>
				<path d='M.5 0v2M4 0v2M8 0v2M12 0v2M15.5 0v2' />
			</Icon>
		);
	},
});

export default GripperHorizontalIcon;
