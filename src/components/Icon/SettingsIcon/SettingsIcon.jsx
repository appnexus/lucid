import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SettingsIcon');

const SettingsIcon = createClass({
	displayName: 'SettingsIcon',

	statics: {
		peek: {
			description: `
				A settings icon.
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
				<path d='M2.254 13.052l1.733-.999A5.702 5.702 0 0 0 6.5 13.501V15.5h3v-1.999a5.708 5.708 0 0 0 2.513-1.451l1.733.999 1.5-2.599-1.733-.998c.25-.951.25-1.951 0-2.902l1.732-1.001-1.499-2.599-1.733 1A5.707 5.707 0 0 0 9.5 2.502V.5h-3v2.002a5.696 5.696 0 0 0-2.513 1.45l-1.726-1L.76 5.553l1.727.997a5.708 5.708 0 0 0 0 2.902L.755 10.453l1.499 2.599z' />
				<circle cx='8' cy='8' r='2.5' />
			</Icon>
		);
	},
});

export default SettingsIcon;
