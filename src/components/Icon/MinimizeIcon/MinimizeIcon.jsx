import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinimizeIcon');

const MinimizeIcon = createClass({
	displayName: 'MinimizeIcon',

	statics: {
		peek: {
			description: `
				A minimize icon.
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
				{...omitProps(passThroughs, MinimizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M15.5 6.5h-6v-6m-3 15v-6h-6' strokeLinecap='square' />
			</Icon>
		);
	},
});

export default MinimizeIcon;
