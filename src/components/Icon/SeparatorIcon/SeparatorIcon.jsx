import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SeparatorIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An Separator icon.
 */
const SeparatorIcon = createClass({
	displayName: 'SeparatorIcon',
	_isPrivate: true,
	propTypes: Icon.propTypes,

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, SeparatorIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M5.2 0h1.5l4 8-4 8H5.2l4-8-4-8z" />
			</Icon>
		);
	},
});

export default SeparatorIcon;
