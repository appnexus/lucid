import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StarIcon');

const StarIcon = createClass({
	displayName: 'StarIcon',

	statics: {
		peek: {
			description: `
				You're a shooting star!
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
		const { className, isClickable, isDisabled, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isDisabled={isDisabled}
				isClickable={isClickable}
				className={cx(
					'&',
					isClickable && '&-is-clickable',
					isDisabled && '&-is-disabled',
					className
				)}
			>
				<path
					className={cx('&-background')}
					d='M8 .75l2.318 4.696 5.182.753-3.75 3.655.885 5.162L8 12.579l-4.635 2.437.885-5.162L.5 6.199l5.182-.753z'
				/>
			</Icon>
		);
	},
});

export default StarIcon;
