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
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, SuccessIcon, [], false)}
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
					className={cx('&-check')}
					d="M11.92 5.19l-.22-.23c-.284-.285-.75-.285-1.032 0l-4.13 4.127L4.79 7.474c-.285-.286-.747-.286-1.032 0l-.287.342c-.285.286-.285.746 0 1.033l2.486 2.353c.285.285.748.285 1.033 0l4.93-4.98c.285-.285.285-.748 0-1.034z"
				/>
			</Icon>
		);
	},
});

export default SuccessIcon;
