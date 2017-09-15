import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ResizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A resize icon.
 */
const ResizeIcon = createClass({
	displayName: 'ResizeIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, ResizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M15.146 4.178l.707.707-11 11-.707-.707 11-11zM15.146 8.178l.707.707-7 7-.707-.707 7-7zM15.146 12.178l.707.707-3 3-.707-.707 3-3z" />
			</Icon>
		);
	},
});

export default ResizeIcon;
