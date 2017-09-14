import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerLightIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * DANGER WILL ROBINSON DANGER
 */
const DangerLightIcon = createClass({
	displayName: 'DangerLightIcon',
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
					d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"
				/>
				<path
					className={cx('&-x', { '&-x-is-disabled': isDisabled })}
					d="M9.163 8l2.48 2.465-1.17 1.17-2.466-2.48-2.48 2.48-1.17-1.17L6.837 8l-2.45-2.463 1.17-1.17 2.45 2.464 2.464-2.464 1.17 1.17L9.164 8zM16 8c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-1 0c0-3.86-3.14-7-7-7S1 4.14 1 8s3.14 7 7 7 7-3.14 7-7z"
				/>
			</Icon>
		);
	},
});

export default DangerLightIcon;
