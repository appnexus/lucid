import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StarOutlineIcon');

const StarOutlineIcon = createClass({
	displayName: 'StarOutlineIcon',

	statics: {
		peek: {
			description: `
				It's gone supernova.
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
				<path d='M8 .75l2.318 4.696 5.182.753-3.75 3.655.885 5.162L8 12.579l-4.635 2.437.885-5.162L.5 6.199l5.182-.753z' />
			</Icon>
		);
	},
});

export default StarOutlineIcon;
