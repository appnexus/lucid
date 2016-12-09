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
		const {
			className,
			isDisabled,
			isClickable,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, DangerIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx('&', className, isClickable && '&-is-clickable')}
			>
				<circle className={cx('&-background', { '&-background-is-disabled': isDisabled })} cx='8' cy='8' r='8'/>
				<path className={cx('&-x')} d='M6.836,8L4.387,5.537l1.17-1.171l2.449,2.465l2.465-2.465l1.17,1.171L9.163,8l2.479,2.465l-1.168,1.17 L8.007,9.156l-2.48,2.479l-1.17-1.171L6.836,8z'/>
			</Icon>
		);
	},
});

export default DangerIcon;
