import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DuplicateIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used when something can be duplicated.
 */
const DuplicateIcon = createClass({
	displayName: 'DuplicateIcon',
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
				<path d="M12.75 1h-7.5C4.56 1 4 1.56 4 2.25V3H2.25C1.56 3 1 3.56 1 4.25v9.5c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25V13h1.75c.69 0 1.25-.56 1.25-1.25v-9.5C14 1.56 13.44 1 12.75 1zM10 13.75c0 .14-.11.25-.25.25h-7.5c-.138 0-.25-.11-.25-.25v-9.5c0-.138.112-.25.25-.25h7.5c.14 0 .25.112.25.25v9.5zm3-2c0 .14-.11.25-.25.25H11V4.25C11 3.56 10.44 3 9.75 3H5v-.75c0-.138.112-.25.25-.25h7.5c.14 0 .25.112.25.25v9.5z" />
			</Icon>
		);
	},
});

export default DuplicateIcon;
