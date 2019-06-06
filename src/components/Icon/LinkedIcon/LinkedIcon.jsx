import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LinkedIcon');

const LinkedIcon = createClass({
	displayName: 'LinkedIcon',

	statics: {
		peek: {
			description: `
				Get linked in with this fresh new icon!
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
				<path strokeLinecap='square' d='M5 11l6-6' />
				<path d='M8.968 7.032a3.009 3.009 0 0 1 0-4.243l1.414-1.414a3.009 3.009 0 0 1 4.243 0 3.009 3.009 0 0 1 0 4.243l-1.414 1.414a3.009 3.009 0 0 1-4.243 0zm-7.593 7.593a3.009 3.009 0 0 1 0-4.243l1.414-1.414a3.009 3.009 0 0 1 4.243 0 3.009 3.009 0 0 1 0 4.243l-1.414 1.414a3.009 3.009 0 0 1-4.243 0z' />
			</Icon>
		);
	},
});

export default LinkedIcon;
