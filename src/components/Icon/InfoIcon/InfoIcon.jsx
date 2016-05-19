import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InfoIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An info icon.
 */
const InfoIcon = createClass({
	displayName: 'InfoIcon',
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
				isBadge
			>
				<rect x='7' y='3' width='2' height='2'/>
				<rect x='7' y='6' width='2' height='7'/>
			</Icon>
		);
	},
});

export default InfoIcon;
