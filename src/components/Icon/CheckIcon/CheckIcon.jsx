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
				<path d="M6.327 12.99l-5.22-5.018L2.494 6.53l3.805 3.66 7.18-7.18 1.414 1.414z" />
			</Icon>
		);
	},
});

export default CheckIcon;
