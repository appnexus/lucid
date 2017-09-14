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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M7.998 0h-.005c-.237.004-.45.144-.535.358L5.583 5H.57c-.246 0-.465.148-.546.37-.083.223-.01.47.18.62l4.053 3.225L2.76 14.29c-.067.226.022.47.22.606.1.07.218.104.338.104.114 0 .23-.033.33-.1l4.347-2.92 4.348 2.92c.1.066.216.1.33.1.12 0 .237-.035.34-.104.197-.137.285-.38.218-.607l-1.495-5.076 4.053-3.226c.19-.15.264-.397.18-.62-.08-.222-.3-.37-.546-.37H10.41L8.534.358C8.448.144 8.236.004 7.998 0z" />
			</Icon>
		);
	},
});

export default StarIcon;
