import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DataViewIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to guide users to more detailed data.
 */
const DataViewIcon = createClass({
	displayName: 'DataViewIcon',
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
				<path d="M14 2c-1.104 0-2 .896-2 2 0 .488.182.93.473 1.277l-2.757 3.86C9.492 9.052 9.253 9 9 9c-.292 0-.567.066-.817.178L6.596 7.194C6.846 6.86 7 6.45 7 6c0-1.104-.896-2-2-2s-2 .896-2 2c0 .37.107.713.283 1.01L.045 10.246l.707.707L3.99 7.717C4.287 7.893 4.63 8 5 8c.292 0 .567-.066.817-.178l1.587 1.985C7.154 10.14 7 10.55 7 11c0 1.104.896 2 2 2s2-.896 2-2c0-.488-.182-.93-.473-1.277l2.757-3.86c.224.085.463.137.716.137 1.104 0 2-.896 2-2s-.896-2-2-2z" />
			</Icon>
		);
	},
});

export default DataViewIcon;
