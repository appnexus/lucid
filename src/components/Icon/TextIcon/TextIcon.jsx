import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-TextIcon');

const TextIcon = createClass({
	displayName: 'TextIcon',

	statics: {
		peek: {
			description: `
				A text icon.
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
				<path d='M.5 2.5v-2h15v2' />
				<path d='M8 15.5V.5' />
				<path d='M4.5 15.5h7' />
			</Icon>
		);
	},
});

export default TextIcon;
