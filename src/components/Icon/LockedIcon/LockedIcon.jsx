import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LockedIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * You shall not pass!
 */
const LockedIcon = createClass({
	displayName: 'LockedIcon',
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
				<path d="M11 7.05V6.5C11 4.566 9.434 3 7.5 3S4 4.566 4 6.5v.55c-.566.12-1 .598-1 1.2v4.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25v-4.5c0-.602-.434-1.08-1-1.2zM7.5 4.703c.99 0 1.798.807 1.798 1.798V7H5.702v-.5c0-.99.807-1.798 1.798-1.798z" />
			</Icon>
		);
	},
});

export default LockedIcon;
