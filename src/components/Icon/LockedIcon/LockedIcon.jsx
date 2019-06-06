import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LockedIcon');

const LockedIcon = createClass({
	displayName: 'LockedIcon',

	statics: {
		peek: {
			description: `
				You shall not pass!
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
				<path d='M1.5 6.5h13v9h-13zm2 0V5a4.5 4.5 0 0 1 9 0v1.5m-4.51 6.793v-3' />
				<circle cx='8' cy='10' r='.5' />
			</Icon>
		);
	},
});

export default LockedIcon;
