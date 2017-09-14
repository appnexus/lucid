import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CrossIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A cross icon.
 */
const CrossIcon = createClass({
	displayName: 'CrossIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, CrossIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M6.837 8l-2.45-2.464 1.17-1.17 2.45 2.464 2.465-2.465 1.17 1.17L9.162 8l2.48 2.464-1.167 1.17-2.467-2.48-2.48 2.48-1.17-1.17L6.838 8z" />
			</Icon>
		);
	},
});

export default CrossIcon;
