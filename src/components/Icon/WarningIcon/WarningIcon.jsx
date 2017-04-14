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
					d="M8.011,0 C7.379,0 6.747,0.457 6.268,1.369 C5.242,3.321 0.864,11.832 0.419,12.681 C-0.54,14.503 0.228,15.999 2.124,15.999 C3.186,15.999 10.737,15.999 13.877,15.999 C15.773,15.999 16.541,14.506 15.584,12.681 C13.209,8.156 12.127,5.892 9.755,1.369 C9.273,0.458 8.641,0 8.011,0 L8.011,0 z"
				/>
				<rect className={cx('&-mark')} x="7" y="4" width="2" height="7" />
				<rect className={cx('&-mark')} x="7" y="12" width="2" height="2" />
			</Icon>
		);
	},
});

export default WarningIcon;
