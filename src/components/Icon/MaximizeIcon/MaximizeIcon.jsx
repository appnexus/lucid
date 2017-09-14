import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MaximizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A maximize icon.
 */
const MaximizeIcon = createClass({
	displayName: 'MaximizeIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, MaximizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M4 12h4v1.996s-4.17.002-4.172 0c-.814.057-1.314-.465-1.314-.465s-.584-.48-.507-1.294c-.002-.002 0-4.233 0-4.233L4 8v4zm9.996-8.172c.057-.814-.465-1.314-.465-1.314s-.48-.584-1.294-.507c-.002-.002-4.233 0-4.233 0L8 4h4v4h1.996s.002-4.17 0-4.172z" />
			</Icon>
		);
	},
});

export default MaximizeIcon;
