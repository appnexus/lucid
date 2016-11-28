import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StarIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * You're a shooting star!
 */
const StarIcon = createClass({
	displayName: 'StarIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M7.998,0c0,0-0.001,0.001-0.003,0.001C7.994,0.001,7.993,0,7.993,0v0.001c-0.237,0.003-0.45,0.143-0.535,0.357L5.583,5H0.57 C0.324,5,0.105,5.148,0.024,5.371c-0.083,0.222-0.01,0.47,0.181,0.618l4.052,3.226l-1.496,5.074 c-0.068,0.227,0.021,0.471,0.219,0.607C3.081,14.965,3.198,15,3.318,15c0.114,0,0.231-0.033,0.33-0.1l4.347-2.92l4.348,2.92 c0.099,0.066,0.216,0.1,0.33,0.1c0.12,0,0.237-0.035,0.339-0.104c0.198-0.137,0.286-0.381,0.219-0.607l-1.497-5.074l4.053-3.226 c0.19-0.148,0.264-0.396,0.18-0.618C15.887,5.148,15.667,5,15.421,5h-5.013L8.534,0.358C8.448,0.144,8.236,0.004,7.998,0L7.998,0 L7.998,0z'/>
			</Icon>
		);
	},
});

export default StarIcon;
