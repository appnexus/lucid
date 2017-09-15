import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HomeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * RUNHOME Jack! No, no, no, HOMERUN Jack!
 */
const HomeIcon = createClass({
	displayName: 'HomeIcon',
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
				<path d="M14.6 8c.22 0 .273-.127.117-.282L8.283 1.28c-.156-.154-.41-.152-.564.004-2.57 2.573-3.855 3.86-6.422 6.433-.155.156-.1.283.12.283H3v5.6c0 .22.18.4.4.4h3.2c.22 0 .4-.18.4-.4V11h2v2.6c0 .22.182.4.402.4H12.6c.22 0 .4-.18.4-.4V8h1.6z" />
			</Icon>
		);
	},
});

export default HomeIcon;
