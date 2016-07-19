import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SuccessLightIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const SuccessLightIcon = createClass({
	displayName: 'SuccessLightIcon',
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
				<path fill='#3FA516' d='M11.92,5.189c0.285,0.285,0.285,0.749,0,1.033l-4.932,4.981c-0.285,0.285-0.748,0.285-1.033,0L3.47,8.85 c-0.286-0.287-0.286-0.748,0-1.034l0.287-0.343c0.285-0.286,0.747-0.286,1.033,0l1.747,1.614l4.13-4.127 c0.284-0.285,0.748-0.285,1.033,0L11.92,5.189z M16,8c0,4.418-3.582,8-8,8s-8-3.582-8-8s3.582-8,8-8S16,3.582,16,8z M15,8 c0-3.86-3.141-7-7-7S1,4.14,1,8c0,3.859,3.141,7,7,7S15,11.859,15,8z'/>
			</Icon>
		);
	},
});

export default SuccessLightIcon;
