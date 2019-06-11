import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CrownIcon');

const CrownIcon = createClass({
	displayName: 'CrownIcon',

	statics: {
		peek: {
			description: `
				A crown icon, used for indicating super or admin users.
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
				<path d='M1.5 14.5h13' />
				<path d='M1.5 11.5h13l1-8-4 2L8 .5l-3.5 5-4-2z' />
			</Icon>
		);
	},
});

export default CrownIcon;
