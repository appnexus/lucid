import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusCircleIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const MinusCircleIcon = createClass({
	displayName: 'MinusCircleIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
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
				<rect className={cx('&-minus')} x="3" y="7" width="10" height="2" />
			</Icon>
		);
	},
});

export default MinusCircleIcon;
