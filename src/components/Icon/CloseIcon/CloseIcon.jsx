import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../../util/style-helpers';
import Icon from '../Icon';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CloseIcon');

const CloseIcon = createClass({
	statics: {
		peek: {
			description: `
				A larger close X icon
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	displayName: 'CloseIcon',

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, CloseIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M.5.5l15 15m0-15l-15 15' />
			</Icon>
		);
	},
});

export default CloseIcon;
