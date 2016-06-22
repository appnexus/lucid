import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperVerticalIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A vertical gripper icon.
 */
const GripperVerticalIcon = createClass({
	displayName: 'GripperVerticalIcon',

	_lucidIsPrivate: true,

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
				width={2}
				height={16}
				viewBox='0 0 2 16'
				{...passThroughs}
				className={cx('&', className)}
			>
				<path d='M0,0h16v1H0V0z' />
				<path d='M0,2h16v1H0V2z' />
				<path d='M0,4h16v1H0V4z' />
				<path d='M0,6h16v1H0V6z' />
				<path d='M0,8h16v1H0V8z' />
				<path d='M0,10h16v1H0V10z' />
				<path d='M0,12h16v1H0V12z' />
				<path d='M0,14h16v1H0V14z' />
			</Icon>
		);
	},
});

export default GripperVerticalIcon;
