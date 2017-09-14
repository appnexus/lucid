import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-NewWindowIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A new window icon.
 */
const NewWindowIcon = createClass({
	displayName: 'NewWindowIcon',
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
				<path d="M14 8h-1.28l.003-3.64-4.416 4.416c-.3.298-.783.298-1.082 0-.3-.3-.3-.784 0-1.082l4.416-4.417L8 3.267V2s4.646.002 4.646.004c.623-.05 1.012.337 1.012.337s.393.39.342 1.013c.003 0 0 4.647 0 4.647zm-1 4.75c0 .138-.112.25-.25.25h-9.5c-.138 0-.25-.112-.25-.25v-9.5c0-.138.112-.25.25-.25H7V2H3.25C2.56 2 2 2.56 2 3.25v9.5c0 .69.56 1.25 1.25 1.25h9.5c.69 0 1.25-.56 1.25-1.25V9h-1v3.75z" />
			</Icon>
		);
	},
});

export default NewWindowIcon;
