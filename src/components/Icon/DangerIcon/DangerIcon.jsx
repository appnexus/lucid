import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "CrossIcon", "madeFrom": ["CrossIcon"]}
 *
 * DANGER WILL ROBINSON DANGER
 */
const DangerIcon = createClass({
	displayName: 'DangerIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, DangerIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx('&', className, isClickable && '&-is-clickable')}
			>
				<circle
					className={cx('&-background', {
						'&-background-is-disabled': isDisabled,
					})}
					cx="8"
					cy="8"
					r="8"
				/>
				<path
					className={cx('&-x')}
					d="M6.836 8l-2.45-2.463 1.17-1.17 2.45 2.464 2.465-2.464 1.17 1.17L9.164 8l2.48 2.465-1.17 1.17-2.466-2.48-2.48 2.48-1.17-1.17L6.837 8z"
				/>
			</Icon>
		);
	},
});

export default DangerIcon;
