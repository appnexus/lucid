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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M11.92 5.19c.285.284.285.748 0 1.032l-4.932 4.98c-.285.286-.748.286-1.033 0L3.47 8.85c-.286-.287-.286-.748 0-1.034l.287-.343c.285-.286.747-.286 1.033 0l1.747 1.614 4.13-4.127c.284-.285.748-.285 1.033 0l.22.23z" />
			</Icon>
		);
	},
});

export default CheckIcon;
