import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SuccessIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "CheckIcon", "madeFrom": ["CheckIcon"]}
 *
 * A success icon.
 */
const SuccessIcon = createClass({
	displayName: 'SuccessIcon',
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
				{...omitProps(passThroughs, SuccessIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx('&', className, isClickable && '&-is-clickable')}
			>
				<circle className={cx('&-background', { '&-background-is-disabled': isDisabled })} cx='8' cy='8' r='8'/>
				<path className={cx('&-check')} d='M11.92,5.189L11.701,4.96c-0.285-0.285-0.75-0.285-1.033,0l-4.13,4.127L4.791,7.474 c-0.286-0.286-0.748-0.286-1.033,0L3.471,7.816c-0.286,0.286-0.286,0.746,0,1.033l2.485,2.354c0.285,0.285,0.748,0.285,1.033,0 l4.932-4.98C12.205,5.938,12.205,5.475,11.92,5.189z'/>
			</Icon>
		);
	},
});

export default SuccessIcon;
