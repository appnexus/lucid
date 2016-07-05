import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MaximizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A maximize icon.
 */
const MaximizeIcon = createClass({
	displayName: 'MaximizeIcon',
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
				<path d='M1.996,11L1.984,6L0,6.003c0,0-0.002,5.236,0,5.237c-0.077,0.813,0.507,1.296,0.507,1.296s0.5,0.521,1.315,0.464C1.823,13.002,7,13,7,13v-2H1.996z'/>
				<path d='M11.004,2l0.012,5L13,6.997c0,0,0.003-5.236,0-5.237c0.077-0.813-0.507-1.296-0.507-1.296S11.993-0.057,11.177,0C11.177-0.002,6,0,6,0v2H11.004z'/>
			</Icon>
		);
	},
});

export default MaximizeIcon;
