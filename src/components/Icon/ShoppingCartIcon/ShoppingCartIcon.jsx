import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ShoppingCartIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Buy buy buy!
 */
const ShoppingCartIcon = createClass({
	displayName: 'ShoppingCartIcon',
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
				<path d='M15.203,10.494c0,0.35-0.283,0.506-0.633,0.506H5.921c-0.269,0-0.508-0.17-0.597-0.424L2.096,2.003H0.634 C0.284,2.003,0,1.852,0,1.501C0,1.151,0.284,1,0.634,1h1.691c0.269,0,0.508,0.17,0.598,0.424L6.15,10h8.42 C14.92,10,15.203,10.145,15.203,10.494z M15.438,3.238L5.275,3.01C4.928,2.998,4.741,3.254,4.862,3.58l2.041,4.825 C7.024,8.733,7.408,9,7.756,9h7.078c0.348,0,0.666-0.283,0.708-0.629l0.454-4.48C16.037,3.545,15.786,3.252,15.438,3.238z M7.5,12 C6.671,12,6,12.672,6,13.5S6.671,15,7.5,15S9,14.328,9,13.5S8.329,12,7.5,12z M12.5,12c-0.828,0-1.5,0.672-1.5,1.5 s0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5S13.328,12,12.5,12z'/>
			</Icon>
		);
	},
});

export default ShoppingCartIcon;
