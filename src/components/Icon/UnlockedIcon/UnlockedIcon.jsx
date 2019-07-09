import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UnlockedIcon');

const UnlockedIcon = createClass({
	displayName: 'UnlockedIcon',

	statics: {
		peek: {
			description: `
				Unlock it.
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
				<path d='M1.5 6.5h13v9h-13zm2 0V5a4.5 4.5 0 0 1 8.741-1.508M7.99 13.293v-3' />
				<circle cx='8' cy='10' r='.5' />
			</Icon>
		);
	},
});

export default UnlockedIcon;
