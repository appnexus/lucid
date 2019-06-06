import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InfoIcon');

const InfoIcon = createClass({
	displayName: 'InfoIcon',

	statics: {
		peek: {
			description: `
				An info icon.
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
				{...omitProps(passThroughs, InfoIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
				<path className={cx('&-i')} d='M7.99 12.5v-6' />
				<circle className={cx('&-i')} cx='7.99' cy='4' r='.293' />
			</Icon>
		);
	},
});

export default InfoIcon;
