import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CheckIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A check icon.
 */
const CheckIcon = createClass({
	displayName: 'CheckIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={cx('&', className)}
			>
				<path d='M11.92,5.189 L11.7,4.96 C11.415,4.675 10.951,4.675 10.667,4.96 L6.537,9.087 L4.79,7.473 C4.504,7.187 4.042,7.187 3.757,7.473 L3.47,7.816 C3.184,8.101 3.184,8.563 3.47,8.849 L5.955,11.203 C6.24,11.488 6.703,11.488 6.988,11.203 L11.92,6.222 C12.205,5.938 12.205,5.474 11.92,5.189 z'/>
			</Icon>
		);
	}
});

export default CheckIcon;
