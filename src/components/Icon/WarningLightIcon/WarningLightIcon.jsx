import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningLightIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Diet version.
 */
const WarningLightIcon = createClass({
	displayName: 'WarningLightIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx('&', className, isClickable && '&-is-clickable')}
			>
				<path
					className={cx('&-background')}
					d="M8.005 1c.192 0 .533.22.858.834 1.176 2.243 2.05 3.957 2.893 5.614.855 1.68 1.74 3.417 2.937 5.698.312.596.384 1.14.192 1.458-.208.345-.725.396-1.014.396H2.12c-.29 0-.805-.05-1.013-.396-.192-.317-.12-.86.194-1.457.164-.314.866-1.677 1.74-3.368C4.5 6.943 6.5 3.06 7.146 1.834 7.47 1.22 7.812 1 8.005 1"
				/>
				<path
					className={cx('&-mark', { '&-mark-is-disabled': isDisabled })}
					d="M8.005 1c.192 0 .533.22.858.834 1.176 2.243 2.05 3.957 2.893 5.614.855 1.68 1.74 3.417 2.937 5.698.312.596.384 1.14.192 1.458-.208.345-.725.396-1.014.396H2.12c-.29 0-.805-.05-1.013-.396-.192-.317-.12-.86.194-1.457.164-.314.866-1.677 1.74-3.368C4.5 6.943 6.5 3.06 7.146 1.834 7.47 1.22 7.812 1 8.005 1m0-1C7.373 0 6.74.46 6.262 1.37 5.236 3.322.858 11.833.412 12.683-.545 14.503.223 16 2.12 16H13.87c1.897 0 2.665-1.493 1.708-3.317-2.375-4.525-3.457-6.79-5.83-11.312C9.27.46 8.636 0 8.006 0z"
				/>
				<path
					className={cx('&-mark', { '&-mark-is-disabled': isDisabled })}
					d="M9 4v7H7V4h2zM7 14h2v-2H7v2z"
				/>
			</Icon>
		);
	},
});

export default WarningLightIcon;
