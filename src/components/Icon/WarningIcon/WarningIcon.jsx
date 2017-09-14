import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A warning Icon.
 */
const WarningIcon = createClass({
	displayName: 'WarningIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, WarningIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx('&', className, isClickable && '&-is-clickable')}
			>
				<path
					className={cx('&-triangle', { '&-triangle-is-disabled': isDisabled })}
					d="M8.01 0C7.38 0 6.748.457 6.27 1.37 5.242 3.32.864 11.83.418 12.68-.54 14.504.23 16 2.125 16h11.753c1.896 0 2.664-1.494 1.707-3.32-2.375-4.524-3.457-6.788-5.83-11.31C9.275.457 8.642 0 8.012 0z"
				/>
				<rect className={cx('&-mark')} x="7" y="4" width="2" height="7" />
				<rect className={cx('&-mark')} x="7" y="12" width="2" height="2" />
			</Icon>
		);
	},
});

export default WarningIcon;
