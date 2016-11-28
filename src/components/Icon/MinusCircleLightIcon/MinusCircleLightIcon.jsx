import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusCircleLightIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const MinusCircleLightIcon = createClass({
	displayName: 'MinusCircleLightIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			isDisabled,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				isDisabled={isDisabled}
				className={cx('&', className)}
			>
				<path className={cx('&-background')} d='M8,15c-3.859,0-7-3.141-7-7c0-3.86,3.141-7,7-7s7,3.14,7,7C15,11.859,11.859,15,8,15z'/>
				<path className={cx('&-minus-circle', { '&-minus-circle-is-disabled': isDisabled })} d='M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M8,15c-3.859,0-7-3.141-7-7 c0-3.86,3.141-7,7-7s7,3.14,7,7C15,11.859,11.859,15,8,15z M13,7v2H3V7H13z'/>
			</Icon>
		);
	},
});

export default MinusCircleLightIcon;
