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
 * It's gone supernova.
 */
const StarOutlineIcon = createClass({
	displayName: 'StarOutlineIcon',
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
				<path d="M8.006 1.285L9.848 5.82h4.766L10.77 8.905l1.44 4.884-4.205-2.825-4.203 2.824L5.24 8.904 1.398 5.82h4.766l1.842-4.535M8.008 0h-.003-.002c-.237.004-.45.144-.535.358L5.593 5H.58c-.246 0-.465.148-.546.37-.083.223-.01.47.18.62l4.053 3.225L2.77 14.29c-.067.226.022.47.22.606.1.07.218.104.338.104.114 0 .23-.033.33-.1l4.347-2.92 4.35 2.92c.098.065.214.1.33.1.118 0 .235-.035.337-.104.2-.138.287-.38.22-.607l-1.497-5.075 4.053-3.226c.19-.15.264-.397.18-.62-.082-.222-.3-.37-.546-.37h-5.014L8.544.358C8.458.144 8.246.004 8.008 0z" />
			</Icon>
		);
	},
});

export default StarOutlineIcon;
