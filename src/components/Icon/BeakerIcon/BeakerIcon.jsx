import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BeakerIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A Beaker icon.
 */
const BeakerIcon = createClass({
	displayName: 'BeakerIcon',
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
				<path
					opacity=".4"
					d="M4.034 11.33c-.02.053-.034.11-.034.17 0 .275.224.5.5.5h7c.276 0 .5-.225.5-.5 0-.06-.015-.117-.034-.17l-.14-.203L10.37 9H5.63l-1.457 2.127-.14.203z"
				/>
				<path d="M12.748 10.67l-.013-.02L10 6.715V3h.3c.277 0 .5-.224.5-.5s-.223-.5-.5-.5H5.7c-.276 0-.5.224-.5.5s.224.5.5.5H6v3.715L3.265 10.65l-.013.02c-.16.238-.252.523-.252.83 0 .336.114.643.3.893.275.367.708.607 1.2.607h7c.492 0 .925-.24 1.2-.607.186-.25.3-.557.3-.893 0-.307-.093-.592-.252-.83zM7 7V3h2v4l1.37 2 1.456 2.127.14.203c.02.053.034.11.034.17 0 .275-.224.5-.5.5h-7c-.276 0-.5-.225-.5-.5 0-.06.015-.117.034-.17l.14-.203L5.63 9 7 7z" />
			</Icon>
		);
	},
});

export default BeakerIcon;
