import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UserIcon');

const UserIcon = createClass({
	displayName: 'UserIcon',

	statics: {
		peek: {
			description: `
				It's all about you.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

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
				<path d='M.5 16a7.5 7.5 0 0 1 15 0' />
				<circle cx='8' cy='4.5' r='4' />
			</Icon>
		);
	},
});

export default UserIcon;
