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
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={cx('&', className)}
			>
				<circle className={cx('&-background')} cx='8' cy='8' r='8'/>
				<rect className={cx('&-minus')} x='3' y='7' width='10' height='2'/>
			</Icon>
		);
	},
});

export default MinusCircleIcon;
