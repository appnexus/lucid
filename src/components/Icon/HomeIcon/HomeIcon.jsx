import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HomeIcon');

const HomeIcon = createClass({
	displayName: 'HomeIcon',

	statics: {
		peek: {
			description: `
				RUNHOME Jack! No, no, no, HOMERUN Jack!
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
				<path d='M8 .5l-7.5 6v9h5v-7h5v7h5v-9z' />
			</Icon>
		);
	},
});

export default HomeIcon;
