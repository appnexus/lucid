import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperVerticalIcon');

const GripperVerticalIcon = createClass({
	displayName: 'GripperVerticalIcon',

	statics: {
		peek: {
			description: `
				A vertical gripper icon.
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
				width={2}
				height={16}
				viewBox='0 0 2 16'
				{...omitProps(passThroughs, GripperVerticalIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M0 .5h2M0 4h2M0 8h2M0 12h2M0 15.5h2' />
			</Icon>
		);
	},
});

export default GripperVerticalIcon;
