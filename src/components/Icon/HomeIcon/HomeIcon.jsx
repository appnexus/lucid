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
				<path d="M14.6,8c0.221,0,0.273-0.127,0.117-0.282c-2.573-2.574-3.86-3.863-6.434-6.437C8.127,1.126,7.874,1.128,7.719,1.284 C5.151,3.857,3.865,5.144,1.298,7.717C1.143,7.873,1.197,8,1.418,8C1.891,8,3,8,3,8s0,3.521,0,5.601C3,13.82,3.18,14,3.4,14 c1.279,0,1.92,0,3.199,0C6.82,14,7,13.82,7,13.6C7,12.721,7,11,7,11h2.001c0,0,0,1.721,0,2.601C9.001,13.82,9.182,14,9.402,14 c1.279,0,1.918,0,3.197,0c0.221,0,0.4-0.18,0.4-0.399C13,11.521,13,8,13,8S14.12,8,14.6,8z" />
			</Icon>
		);
	},
});

export default HomeIcon;
