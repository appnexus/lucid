import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UserIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * You, sir.
 */
const UserIcon = createClass({
	displayName: 'UserIcon',
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
				<path d="M13.99 11.008c-.97-.425-2.362-1.518-4.49-1.894.544-.575.914-1.473 1.338-2.536.246-.617.203-1.142.203-1.89 0-.554.108-1.112-.032-1.6C10.538 1.44 9.395 1 8.004 1c-1.392 0-2.538.443-3.007 2.094-.14.486-.03 1.042-.03 1.594 0 .75-.042 1.277.203 1.895.427 1.068.792 1.965 1.335 2.537-2.11.382-3.54 1.468-4.502 1.89C.01 11.888 0 12.846 0 12.846V14.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-1.655s-.01-.962-2.01-1.837z" />
			</Icon>
		);
	},
});

export default UserIcon;
