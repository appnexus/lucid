import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ShoppingCartIcon');

const ShoppingCartIcon = createClass({
	displayName: 'ShoppingCartIcon',

	statics: {
		peek: {
			description: `
				Buy buy buy!
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
				<path d='M13.5 14a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM7 13.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z' />
				<path d='M14.5 11.5h-9l-2-7h12z' />
				<path strokeLinecap='square' d='M3.5 4.5l-1-2h-2' />
			</Icon>
		);
	},
});

export default ShoppingCartIcon;
