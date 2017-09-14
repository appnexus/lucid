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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M15.203 10.494c0 .35-.283.506-.633.506H5.92c-.268 0-.507-.17-.596-.424L2.096 2.003H.634C.284 2.003 0 1.853 0 1.5c0-.35.284-.5.634-.5h1.69c.27 0 .51.17.6.424L6.15 10h8.42c.35 0 .633.145.633.494zm.235-7.256L5.275 3.01c-.347-.012-.534.244-.413.57l2.04 4.825c.122.328.506.595.854.595h7.078c.348 0 .666-.283.708-.63l.454-4.48c.04-.345-.21-.638-.558-.652zM7.5 12c-.83 0-1.5.672-1.5 1.5S6.67 15 7.5 15 9 14.328 9 13.5 8.33 12 7.5 12zm5 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
			</Icon>
		);
	},
});

export default ShoppingCartIcon;
