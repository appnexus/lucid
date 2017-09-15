import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinimizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A minimize icon.
 */
const MinimizeIcon = createClass({
	displayName: 'MinimizeIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, MinimizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M6.996 10.828c.002.002 0 4.172 0 4.172H5v-4H1l.003-1.993s4.23-.002 4.233 0c.813-.077 1.295.507 1.295.507s.523.5.466 1.314zM11 5V1l-1.993.003s-.002 4.23 0 4.233c-.077.813.507 1.295.507 1.295s.5.522 1.314.466c.002.002 4.172 0 4.172 0V5h-4z" />
			</Icon>
		);
	},
});

export default MinimizeIcon;
