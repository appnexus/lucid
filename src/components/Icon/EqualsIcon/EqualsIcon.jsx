import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EqualsIcon');

const EqualsIcon = createClass({
	displayName: 'EqualsIcon',

	statics: {
		peek: {
			description: `
				An equals icon.
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
				{...omitProps(passThroughs, EqualsIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M.5 5.5h15m-15 5h15' />
			</Icon>
		);
	},
});

export default EqualsIcon;
