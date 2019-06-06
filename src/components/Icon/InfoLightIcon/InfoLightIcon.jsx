import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InfoLightIcon');

const InfoLightIcon = createClass({
	displayName: 'InfoLightIcon',

	statics: {
		peek: {
			description: `
				A light info icon.
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
				<path d='M7.99 12.5v-6' />
				<circle className={cx('&-dot')} cx='7.99' cy='4' r='.293' />
				<circle cx='8' cy='8' r='7.5' />
			</Icon>
		);
	},
});

export default InfoLightIcon;
