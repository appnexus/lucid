import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CheckIcon');

const CheckIcon = createClass({
	displayName: 'CheckIcon',

	statics: {
		peek: {
			description: `
				A check icon.
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
				<path strokeLinecap='square' d='M.5 7L6 12.5 15.5 3' />
			</Icon>
		);
	},
});

export default CheckIcon;
