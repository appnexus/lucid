import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AsteriskIcon');

const AsteriskIcon = createClass({
	displayName: 'AsteriskIcon',

	statics: {
		peek: {
			description: `
				An asterisk icon.
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
				{...omitProps(passThroughs, AsteriskIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M8 0v16m6.928-12L1.072 12m0-8l13.856 8' />
			</Icon>
		);
	},
});

export default AsteriskIcon;
