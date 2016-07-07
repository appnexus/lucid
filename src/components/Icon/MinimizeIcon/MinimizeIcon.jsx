import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinimizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A minimize icon.
 */
const MinimizeIcon = createClass({
	displayName: 'MinimizeIcon',
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
				{...omitProps(passThroughs, MinimizeIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M9.996,5L9.984,0L8,0.003c0,0-0.002,5.236,0,5.237C7.923,6.054,8.508,6.536,8.508,6.536S9.007,7.057,9.822,7C9.823,7.002,15,7,15,7V5H9.996z'/>
				<path d='M5.004,10l0.012,5L7,14.996c0,0,0.003-5.235,0-5.236c0.077-0.813-0.507-1.296-0.507-1.296S5.993,7.943,5.177,8C5.177,7.998,0,8,0,8v2H5.004z'/>
			</Icon>
		);
	},
});

export default MinimizeIcon;
