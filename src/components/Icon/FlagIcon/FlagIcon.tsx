import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FlagIcon');

const FlagIcon = createClass({
	displayName: 'FlagIcon',

	statics: {
		peek: {
			description: `
				A flag icon.
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
				{...omitProps(passThroughs, FlagIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M1.5 9.5s1.083-1 3.25-1 3.25 1 5.417 1 4.333-1 4.333-1v-8s-2.167 1-4.333 1-3.25-1-5.417-1-3.25 1-3.25 1v8zM1.5.5v15' />
			</Icon>
		);
	},
});

export default FlagIcon;
