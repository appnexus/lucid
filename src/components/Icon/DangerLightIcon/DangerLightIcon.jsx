import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerLightIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const DangerLightIcon = createClass({
	displayName: 'DangerLightIcon',
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
				<path className={cx('&-background')} d='M8,15c-3.859,0-7-3.141-7-7c0-3.86,3.141-7,7-7s7,3.14,7,7C15,11.859,11.859,15,8,15z'/>
				<path className={cx('&-x')} d='M9.163,8l2.479,2.465l-1.168,1.17L8.007,9.156l-2.48,2.479l-1.17-1.171L6.836,8L4.387,5.537l1.17-1.171 l2.449,2.465l2.465-2.465l1.17,1.171L9.163,8z M16,8c0,4.418-3.582,8-8,8s-8-3.582-8-8s3.582-8,8-8S16,3.582,16,8z M15,8 c0-3.86-3.141-7-7-7S1,4.14,1,8c0,3.859,3.141,7,7,7S15,11.859,15,8z'/>
			</Icon>
		);
	},
});

export default DangerLightIcon;
