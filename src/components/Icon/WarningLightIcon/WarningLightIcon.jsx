import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningLightIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Diet version.
 */
const WarningLightIcon = createReactClass({
	displayName: 'WarningLightIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx('&', className, isClickable && '&-is-clickable')}
			>
				<path
					className={cx('&-background')}
					d="M8.005,1.001c0.192,0,0.533,0.219,0.858,0.833c1.176,2.243,2.049,3.957,2.893,5.614 c0.855,1.68,1.739,3.417,2.937,5.698c0.312,0.596,0.384,1.141,0.192,1.458C14.677,14.949,14.16,15,13.871,15H2.118 c-0.289,0-0.805-0.051-1.013-0.396c-0.192-0.317-0.12-0.861,0.194-1.457c0.165-0.314,0.867-1.677,1.74-3.368 C4.5,6.944,6.502,3.062,7.147,1.835C7.471,1.219,7.812,1.001,8.005,1.001"
				/>
				<path
					className={cx('&-mark', { '&-mark-is-disabled': isDisabled })}
					d="M8.005,1.001c0.192,0,0.533,0.219,0.858,0.833c1.176,2.243,2.049,3.957,2.893,5.614 c0.855,1.68,1.739,3.417,2.937,5.698c0.312,0.596,0.384,1.141,0.192,1.458C14.677,14.949,14.16,15,13.871,15H2.118 c-0.289,0-0.805-0.051-1.013-0.396c-0.192-0.317-0.12-0.861,0.194-1.457c0.165-0.314,0.867-1.677,1.74-3.368 C4.5,6.944,6.502,3.062,7.147,1.835C7.471,1.219,7.812,1.001,8.005,1.001 M8.005,0.001c-0.632,0-1.264,0.457-1.743,1.369 C5.236,3.322,0.858,11.833,0.413,12.683C-0.546,14.504,0.222,16,2.118,16c1.062,0,8.612,0,11.753,0c1.896,0,2.664-1.493,1.707-3.317 c-2.375-4.525-3.457-6.79-5.829-11.312C9.268,0.459,8.635,0.001,8.005,0.001L8.005,0.001z"
				/>
				<path
					className={cx('&-mark', { '&-mark-is-disabled': isDisabled })}
					d="M9,4v7H7V4H9z M7,14h2v-2H7V14z"
				/>
			</Icon>
		);
	},
});

export default WarningLightIcon;
