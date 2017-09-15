import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SettingsIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A settings icon.
 */
const SettingsIcon = createClass({
	displayName: 'SettingsIcon',
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
				<path d="M14.146 6.836l-1.94-.356c-.187-.035-.253-.192-.145-.35l1.112-1.648c.107-.158.084-.4-.05-.534l-1.067-1.066c-.135-.136-.377-.16-.535-.052L9.873 3.94c-.158.107-.316.04-.352-.146l-.354-1.94c-.035-.186-.22-.34-.412-.34H7.246c-.19 0-.375.154-.41.342L6.48 3.794c-.034.188-.192.254-.35.147L4.48 2.83c-.158-.107-.398-.084-.533.05L2.88 3.948c-.134.136-.157.376-.052.534L3.94 6.13c.106.158.042.315-.147.35l-1.938.358c-.187.035-.34.22-.34.41v1.51c0 .19.153.375.34.41l1.94.356c.188.034.254.192.146.35L2.83 11.52c-.105.16-.082.398.053.533l1.067 1.066c.135.135.375.157.533.052l1.648-1.112c.158-.106.316-.04.35.147l.357 1.938c.035.188.22.342.41.342h1.508c.19 0 .377-.153.412-.342l.355-1.938c.035-.188.193-.255.352-.147l1.646 1.112c.158.105.4.083.535-.053l1.066-1.065c.134-.137.157-.376.05-.535l-1.11-1.648c-.108-.157-.042-.315.145-.35l1.94-.357c.187-.034.34-.22.34-.41V7.247c0-.19-.15-.376-.34-.41zM8 11.086c-1.7 0-3.082-1.378-3.082-3.08 0-1.7 1.38-3.08 3.082-3.08s3.082 1.378 3.082 3.08c0 1.702-1.38 3.08-3.082 3.08z" />
			</Icon>
		);
	},
});

export default SettingsIcon;
