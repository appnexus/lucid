import _ from 'lodash';
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
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M11.92,5.189c0.285,0.285,0.285,0.749,0,1.033l-4.932,4.981c-0.285,0.285-0.748,0.285-1.033,0L3.47,8.85 c-0.286-0.287-0.286-0.748,0-1.034l0.287-0.343c0.285-0.286,0.747-0.286,1.033,0l1.747,1.614l4.13-4.127 c0.284-0.285,0.748-0.285,1.033,0L11.92,5.189z'/>
			</Icon>
		);
	},
});

export default CheckIcon;
