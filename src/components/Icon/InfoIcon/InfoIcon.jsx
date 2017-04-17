import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

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
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, InfoIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx('&', className, isClickable && '&-is-clickable')}
			>
				<circle
					className={cx('&-background', {
						'&-background-is-disabled': isDisabled,
					})}
					cx="8"
					cy="8"
					r="8"
				/>
				<rect className={cx('&-mark')} x="7" y="3" width="2" height="2" />
				<rect className={cx('&-mark')} x="7" y="6" width="2" height="7" />
			</Icon>
		);
	},
});

export default InfoIcon;
