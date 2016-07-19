import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StarOutlineIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const StarOutlineIcon = createClass({
	displayName: 'StarOutlineIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path className={cx('&-background')} d='M8.006,1.285l1.841,4.535h4.766L10.77,8.905l1.439,4.884l-4.204-2.824l-4.203,2.824L5.24,8.905L1.398,5.819 h4.766L8.006,1.285'/>
				<path d='M8.006,1.285l1.841,4.535h4.766L10.77,8.905l1.439,4.884l-4.204-2.824l-4.203,2.824L5.24,8.905L1.398,5.819h4.766 L8.006,1.285 M8.008,0c0,0-0.001,0.001-0.003,0.001C8.004,0.001,8.003,0,8.003,0v0.001c-0.237,0.003-0.45,0.143-0.535,0.357L5.593,5 H0.58C0.334,5,0.115,5.148,0.034,5.371c-0.083,0.222-0.01,0.47,0.181,0.618l4.052,3.226l-1.496,5.074 c-0.068,0.227,0.021,0.471,0.219,0.607C3.091,14.965,3.208,15,3.328,15c0.114,0,0.231-0.033,0.33-0.1l4.347-2.92l4.348,2.92 c0.099,0.066,0.216,0.1,0.33,0.1c0.12,0,0.237-0.035,0.339-0.104c0.198-0.137,0.286-0.381,0.219-0.607l-1.497-5.074l4.053-3.226 c0.19-0.148,0.264-0.396,0.18-0.618C15.896,5.148,15.677,5,15.431,5h-5.013L8.544,0.358C8.458,0.144,8.246,0.004,8.008,0L8.008,0 L8.008,0z'/>
			</Icon>
		);
	},
});

export default StarOutlineIcon;
