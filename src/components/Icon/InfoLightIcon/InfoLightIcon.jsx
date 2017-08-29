import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InfoLightIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A light info icon.
 */
const InfoLightIcon = createReactClass({
	displayName: 'InfoLightIcon',
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
					d="M8,15c-3.859,0-7-3.141-7-7c0-3.86,3.141-7,7-7s7,3.14,7,7C15,11.859,11.859,15,8,15z"
				/>
				<path
					className={cx('&-mark', { '&-mark-is-disabled': isDisabled })}
					d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M8,15c-3.859,0-7-3.141-7-7 c0-3.86,3.141-7,7-7s7,3.14,7,7C15,11.859,11.859,15,8,15z M7,3h2v2H7V3z M7,6h2v7H7V6z"
				/>
			</Icon>
		);
	},
});

export default InfoLightIcon;
